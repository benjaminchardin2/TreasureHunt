import json
from channels.generic.websocket import JsonWebsocketConsumer

from clues.models import Participant

from clues.serializers import ParticipantSerializer


class ParticipantConsumer(JsonWebsocketConsumer):
    def websocket_connect(self, event):
        self.accept()
        id = self.scope["url_route"]["kwargs"]["id"]
        participants = Participant.objects.filter(treasureHuntInstance=id)
        serializer = ParticipantSerializer(participants)
        self.send_json(serializer.data)

    def websocket_receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))

    def websocket_disconnect(self, event):
        pass
