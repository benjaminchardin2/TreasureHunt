from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from clues.models import TreasureHunt, Clues, TreasureHuntInstance
from clues.serializers import TreasureHuntSerializerCustom
from clues.serializers import TreasureHuntSerializer
from clues.serializers import CluesSerializer

from clues.serializers import TreasureHuntInstanceSerializer


class TreasureHuntCreation(APIView):

    def get(self, request, format=None):
        treasureHunt = TreasureHunt.objects.all()
        serializer = TreasureHuntSerializer(treasureHunt, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TreasureHuntSerializerCustom(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CluesView(APIView):

    def get(self, request, format=None):
        clues = Clues.objects.all()
        serializer = CluesSerializer(clues, many=True)
        return Response(serializer.data)


class TreasureHuntInstanceCreation(APIView):

    def post(self, request, format=None):
        serializer = TreasureHuntInstanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id, format=None):
        treasureHuntInstance = TreasureHuntInstance.objects.filter(id=id).first()
        serializer = TreasureHuntInstanceSerializer(treasureHuntInstance)
        return Response(serializer.data, status=status.HTTP_200_OK)
