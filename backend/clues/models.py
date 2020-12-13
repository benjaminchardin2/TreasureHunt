import uuid

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class TreasureHunt(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)


class Clues(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    message = models.CharField(max_length=1500)
    treasureHunt = models.ForeignKey(TreasureHunt, to_field='id', on_delete=models.CASCADE, related_name="clues")
    created_at = models.DateTimeField(auto_now_add=True)


class TreasureHuntInstance(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    treasureHunt = models.ForeignKey(TreasureHunt, to_field='id',  on_delete=models.CASCADE)


class Participant(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    team_name = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    treasureHuntInstance = models.ForeignKey(TreasureHuntInstance, to_field='id', on_delete=models.CASCADE)


class AttributedClues(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    code = models.IntegerField()
    participant = models.ForeignKey(Participant, to_field='id', on_delete=models.CASCADE)
    clue = models.ForeignKey(Clues, to_field='id', on_delete=models.CASCADE)
