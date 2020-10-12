from django.db import models

from accounts.models import User


class TreasureHunt(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.id


class Clues(models.Model):
    id = models.BigIntegerField(primary_key=True)
    message = models.CharField(max_length=1500)
    treasureHunt = models.ForeignKey(TreasureHunt, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id


class Participant(models.Model):
    team_name = models.CharField(max_length=100, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    treasure_hunt = models.ForeignKey(TreasureHunt, on_delete=models.CASCADE)

    def __str__(self):
        return self.team_name


class AttributedClues(models.Model):
    id = models.BigIntegerField(primary_key=True)
    code = models.IntegerField()
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    clue = models.ForeignKey(Clues, on_delete=models.CASCADE)

    def __str__(self):
        return self.id
