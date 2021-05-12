from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.db import utils

from clues.models import Participant

from clues.serializers import ParticipantSerializer


class ParticipantConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.group_name = self.scope["url_route"]["kwargs"]["id"]
        self.accept()
        id_instance = self.scope["url_route"]["kwargs"]["id"]
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

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
                        "type": "chat.message",
                    },
                )
            except utils.IntegrityError:
                print('error')

    def chat_message(self, event):
        id_instance = self.scope["url_route"]["kwargs"]["id"]
        participants = Participant.objects.filter(treasureHuntInstance=id_instance)
        serializer_result = ParticipantSerializer(participants, many=True)
        self.send_json({
            "message": "participants",
            "content": serializer_result.data
        }
        )
