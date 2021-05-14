from asgiref.sync import async_to_sync
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from clues.models import TreasureHunt, Clues, TreasureHuntInstance, Participant
from clues.serializers import TreasureHuntSerializerCustom
from clues.serializers import TreasureHuntSerializer
from clues.serializers import CluesSerializer
from clues.serializers import ParticipantSerializer
from clues.serializers import TreasureHuntInstanceSerializer
from channels.layers import get_channel_layer


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
        channel_layer = get_channel_layer()
        group_name=pk
        async_to_sync(channel_layer.group_send)(group_name, {"type": "launch.game"})
        return Response(status=status.HTTP_200_OK)
