from django.conf.urls import url
from django.urls import path, include
from rest_framework.authtoken import views as authviews
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
                  path('api/register/', views.UserCreate.as_view()),
                  path('api/login/', views.LoginAPI.as_view()),
                  path('api/getToken/', authviews.obtain_auth_token),
                  path('api/users/', views.UserAPI.as_view())
              ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)