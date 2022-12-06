from rest_framework import serializers

from clues.models import Clues as CluesModel, TreasureHunt, Participant, AttributedClues

from clues.models import TreasureHuntInstance

from clues.serializers.clueSerializers import CluesSerializer, CluesCreationSerializer


class TreasureHuntSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=0)
    id = serializers.UUIDField()
    clues = CluesSerializer(many=True, read_only=True)

    class Meta:
        model = TreasureHunt
        fields = '__all__'
        depth = 1


class TreasureHuntSerializerCustom(serializers.ModelSerializer):
    clues = CluesCreationSerializer(many=True)
    name = serializers.CharField(min_length=0)
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
        write_only=True
    )

    def create(self, validated_data):
        clues_details = validated_data.pop('clues')
        treasurehunt = TreasureHunt.objects.create(**validated_data)

        for i in clues_details:
            CluesModel.objects.create(treasureHunt=treasurehunt, **i)
        return treasurehunt

    class Meta:
        model = TreasureHunt
        fields = ('id', 'name', 'clues', 'user')


class TreasureHuntInstanceSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    treasureHunt = TreasureHuntSerializer(read_only=True)
    started = serializers.BooleanField(read_only=True)

    def create(self, validated_data):
        id = validated_data.pop('id')
        treasureHunt = TreasureHunt.objects.get(id=id)
        treasureHuntInstance = TreasureHuntInstance.objects.create(treasureHunt=treasureHunt)
        return treasureHuntInstance

    class Meta:
        model = TreasureHuntInstance
        fields = '__all__'
        depth = 2