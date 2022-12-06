from rest_framework import serializers

from clues.models import TreasureHunt, Participant, AttributedClues

from clues.models import TreasureHuntInstance


class ParticipantSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    teamName = serializers.CharField(min_length=0)
    icon = serializers.IntegerField()
    finishTime = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        id_instance = validated_data.pop('id')
        treasureHuntInstance = TreasureHuntInstance.objects.get(id=id_instance)
        participant = Participant.objects.create(**validated_data, treasureHuntInstance=treasureHuntInstance)
        return participant

    class Meta:
        model = Participant
        fields = '__all__'