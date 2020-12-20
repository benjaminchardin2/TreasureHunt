from django.conf.urls import url
from django.urls import path, include
from rest_framework.authtoken import views as authviews
from . import views

urlpatterns = [
                  path('api/register/', views.UserCreate.as_view()),
                  path('api/login/', views.LoginAPI.as_view()),
                  path('api/getToken/', authviews.obtain_auth_token),
                  path('api/users/', views.UserAPI.as_view())
              ]