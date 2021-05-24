from django.urls import path, include
from clues.views import TreasureHuntInstanceViewSet, TreasureHuntCreationViewSet, CluesViewSet, ParticipantViewSet
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'treasureHuntInstance', TreasureHuntInstanceViewSet)
router.register(r'clues', CluesViewSet)
router.register(r'treasureHunt', TreasureHuntCreationViewSet)
router.register(r'participant', ParticipantViewSet)

urlpatterns = [
                  path('api/', include(router.urls)),
              ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
