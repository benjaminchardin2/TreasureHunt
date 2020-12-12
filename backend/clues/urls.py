from django.urls import path, include
from clues.views import TreasureHuntCreation, CluesView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
                  path('api/treasureHunt', TreasureHuntCreation.as_view()),
                  path('api/clues', CluesView.as_view())
              ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)