from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.db import utils

from clues.models import Participant

from clues.serializers.participantSerializers import ParticipantSerializer

from clues.models import TreasureHuntInstance


class ParticipantConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.group_name = self.scope["url_route"]["kwargs"]["id"]
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        instance = TreasureHuntInstance.objects.get(id=self.group_name)
        if instance.started:
            async_to_sync(self.send(text_data="launch"))


    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.group_name, self.channel_name)

    def receive_json(self, content, **kwargs):
        serializer = ParticipantSerializer(data=content)

        if serializer.is_valid():
            try:
                serializer.save()
                async_to_sync(self.channel_layer.group_send)(
                    self.group_name,
                    {
                        "type": "participant.send",
                    },
                )
            except utils.IntegrityError:
                print('error')

    def participant_send(self, event):
        id_instance = self.scope["url_route"]["kwargs"]["id"]
        participants = Participant.objects.filter(treasureHuntInstance=id_instance)
        serializer_result = ParticipantSerializer(participants, many=True)
        self.send_json({
            "message": "participants",
            "content": serializer_result.data
        })

    def launch_game(self, event):
        self.send(text_data="launch")


class ParticipantFinishConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.group_name = self.scope["url_route"]["kwargs"]["id"]
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.group_name, self.channel_name)

    def participant_finish_send(self, event):
        id_instance = self.scope["url_route"]["kwargs"]["id"]
        participants = Participant.objects.filter(id_instance=id_instance, finishTime__isnull=False).order_by('finishTime')
        serializer_result = ParticipantSerializer(participants, many=True)
        self.send_json({
            "message": "participants",
            "content": serializer_result.data
        })
