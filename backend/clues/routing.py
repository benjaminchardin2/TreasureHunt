from django.urls import path
from clues.consumers import consumers

websocket_urlpatterns = [
    path('ws/treasurehunt/<id>/', consumers.ParticipantConsumer.as_asgi()),
    path('ws/treasurehunt/<id>/finish', consumers.ParticipantFinishConsumer.as_asgi())
]