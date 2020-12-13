from rest_framework import serializers

from clues.models import Clues as CluesModel, TreasureHunt
import logging


class CluesSerializer(serializers.Serializer):
    file = serializers.FileField(max_length=1000,
                                 allow_empty_file=True, ),
    message = serializers.CharField(min_length=0)

    class Meta:
        model = CluesModel
        fields = ('id', 'message')


class TreasureHuntSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=0)
    clues = CluesSerializer(many=True)
    id = serializers.UUIDField()

    class Meta:
        model = TreasureHunt
        fields = ('id', 'name', 'clues')


class TreasureHuntSerializerCustom(serializers.Serializer):
    clues = CluesSerializer(many=True)
    name = serializers.CharField(min_length=0)

    def create(self, validated_data):
        clues_details = validated_data.pop('clues')
        treasurehunt = TreasureHunt.objects.create(**validated_data)

        for i in clues_details:
            CluesModel.objects.create(treasureHunt=treasurehunt, **i)
        return treasurehunt

    class Meta:
        model = TreasureHunt
        fields = ('id', 'name', 'clues')
