from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class TreasureHunt(models.Model):
    name = models.CharField(max_length=100)


class Clues(models.Model):
    message = models.CharField(max_length=1500)
    treasureHunt = models.ForeignKey(TreasureHunt, on_delete=models.CASCADE, related_name="clues")
    created_at = models.DateTimeField(auto_now_add=True)


class TreasureHuntInstance(models.Model):
    treasureHunt = models.ForeignKey(TreasureHunt, on_delete=models.CASCADE)


class Participant(models.Model):
    team_name = models.CharField(max_length=100, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    treasureHuntInstance = models.ForeignKey(TreasureHuntInstance, on_delete=models.CASCADE)


class AttributedClues(models.Model):
    code = models.IntegerField()
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    clue = models.ForeignKey(Clues, on_delete=models.CASCADE)
