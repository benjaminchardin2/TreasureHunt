from django.urls import path, include
from clues.views import TreasureHuntCreation, CluesView
from django.conf import settings
from django.conf.urls.static import static

from clues.views import TreasureHuntInstanceCreation

urlpatterns = [
                  path('api/treasureHunt', TreasureHuntCreation.as_view()),
                  path('api/clues', CluesView.as_view()),
                  path('api/treasureHuntInstance', TreasureHuntInstanceCreation.as_view())
              ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)