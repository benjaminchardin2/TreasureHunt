from asgiref.sync import async_to_sync
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from clues.models import TreasureHunt, Clues, TreasureHuntInstance, Participant, AttributedClues
from clues.serializers import TreasureHuntSerializerCustom
from clues.serializers import TreasureHuntSerializer
from clues.serializers import CluesSerializer
from clues.serializers import ParticipantSerializer
from clues.serializers import TreasureHuntInstanceSerializer
from clues.serializers import SmallCluesSerializer
from channels.layers import get_channel_layer
import random


class TreasureHuntCreationViewSet(ViewSet):
    queryset = TreasureHunt.objects.all()

    def list(self, request):
        treasureHunt = TreasureHunt.objects.all()
        serializer = TreasureHuntSerializer(treasureHunt, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TreasureHuntSerializerCustom(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CluesViewSet(ViewSet):
    queryset = Clues.objects.all()

    def list(self, request):
        clues = Clues.objects.all()
        serializer = CluesSerializer(clues, many=True)
        return Response(serializer.data)


class TreasureHuntInstanceViewSet(ViewSet):
    queryset = TreasureHuntInstance.objects.all()

    def create(self, request):
        serializer = TreasureHuntInstanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        treasureHuntInstance = TreasureHuntInstance.objects.filter(id=pk).first()
        serializer = TreasureHuntInstanceSerializer(treasureHuntInstance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], name='Get participant', url_path='participant/(?P<team_id>[^/.]+)')
    def participant(self, request, pk=None, **kwargs):
        participant = Participant.objects.filter(treasureHuntInstance=pk, id=kwargs['team_id']).first()
        serializer = ParticipantSerializer(participant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], name='Get participants', url_path='participant')
    def participantList(self, request, pk=None, **kwargs):
        participants = Participant.objects.filter(treasureHuntInstance=pk)
        serializer = ParticipantSerializer(participants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], name='Launch Instance', url_path='launch')
    def launch(self, request, pk=None):
        instance = TreasureHuntInstance.objects.get(id=pk)
        instance.started = True
        instance.save()
        channel_layer = get_channel_layer()
        group_name=pk
        self.attributeClues(pk)
        async_to_sync(channel_layer.group_send)(group_name, {"type": "launch.game"})
        return Response(status=status.HTTP_200_OK)

    def attributeClues(self, instance_id):
        treasure_hunt_instance = TreasureHuntInstance.objects.get(id=instance_id)
        treasure_hunt = treasure_hunt_instance.treasureHunt
        clues = list(Clues.objects.filter(treasureHunt=treasure_hunt, final=False))
        participants = Participant.objects.filter(treasureHuntInstance=treasure_hunt_instance)
        for participant in participants:
            if len(clues) == 0:
                clues = list(Clues.objects.filter(treasureHunt=treasure_hunt, final=False))
            AttributedClues.objects.create(
            code='0000',
            obtained=True,
            participant=participant,
            clue=clues.pop(),
            index=0)
        all_clues = list(Clues.objects.filter(treasureHunt=treasure_hunt, final=False))
        for x in range(len(all_clues)-1):
            available_clues = all_clues.copy()
            for participant in participants:
                previous_clue = AttributedClues.objects.filter(index=x, participant=participant).first()
                clue_assigned = self.selectClue(participant, available_clues)
                while(clue_assigned == None) :
                    available_clues = all_clues.copy()
                    clue_assigned = self.selectClue(participant, available_clues)
                AttributedClues.objects.create(
                            code=previous_clue.clue.code,
                            obtained=False,
                            participant=participant,
                            clue=clue_assigned,
                            index=x+1)
                available_clues.remove(clue_assigned)
        final_clue = Clues.objects.filter(treasureHunt=treasure_hunt, final=True).first()
        for participant in participants:
            previous_clue = AttributedClues.objects.filter(index=len(all_clues)-1, participant=participant).first()
            AttributedClues.objects.create(code=previous_clue.clue.code,
                                   obtained=False,
                                   participant=participant,
                                   clue=final_clue,
                                   index=previous_clue.index+1)

    def selectClue(self, participant, available_clues):
        already_attributed_clues = list(AttributedClues.objects.filter(participant=participant).values_list('clue', flat=True))
        clues_assignable = [x for x in available_clues if x.id not in already_attributed_clues]
        if (len(clues_assignable) > 0):
            return clues_assignable.pop(random.randint(0, len(clues_assignable)-1))
        return None


class ParticipantViewSet(ViewSet):
    queryset = Participant.objects.all()

    @action(detail=True, methods=['get'], name='Get last obtained clue', url_path='clues/last')
    def retrieve_last_obtained_clue(self, request, pk=None, **kwargs):
        participant = Participant.objects.get(id=pk)
        last_obtained_clue = AttributedClues.objects.filter(obtained=True, participant=participant).order_by('-index').first()
        serializer = SmallCluesSerializer(last_obtained_clue.clue)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], name='Try to get next clue', url_path='clues/next')
    def try_to_get_next_clue(self, request, pk=None, **kwargs):
        code = request.data
        participant = Participant.objects.get(id=pk)
        last_obtained_clue = AttributedClues.objects.filter(obtained=True, participant=participant).order_by('-index').first()
        next_clue = AttributedClues.objects\
            .filter(obtained=False, code=code, participant=participant, index=(last_obtained_clue.index + 1))\
            .first()
        if next_clue is not None:
            next_clue.obtained = True
            next_clue.save()
            serializer = SmallCluesSerializer(next_clue.clue)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_200_OK)
