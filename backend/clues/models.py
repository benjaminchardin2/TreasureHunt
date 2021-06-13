import uuid

from django.db import models
from django.contrib.auth import get_user_model
import random

User = get_user_model()


def random_string():
    return str(random.randint(1, 9999))


class TreasureHunt(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)


class Clues(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    message = models.CharField(max_length=1500)
    code = models.CharField(max_length=4, default=random_string)
    file = models.FileField(default=None)
    treasureHunt = models.ForeignKey(TreasureHunt, to_field='id', on_delete=models.CASCADE, related_name="clues")
    final = models.BooleanField(editable=False)
    created_at = models.DateTimeField(auto_now_add=True)


class TreasureHuntInstance(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    treasureHunt = models.ForeignKey(TreasureHunt, to_field='id', on_delete=models.CASCADE)
    started = models.BooleanField(default=False)


class Participant(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    teamName = models.CharField(max_length=100)
    icon = models.IntegerField()
    treasureHuntInstance = models.ForeignKey(TreasureHuntInstance, to_field='id', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('teamName', 'treasureHuntInstance')


class AttributedClues(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    code = models.CharField(default=random_string, max_length=4)
    participant = models.ForeignKey(Participant, to_field='id', on_delete=models.CASCADE)
    clue = models.ForeignKey(Clues, to_field='id', on_delete=models.CASCADE)
    obtained = models.BooleanField(default=False)
    index = models.IntegerField()

    class Meta:
            unique_together = ('participant', 'index')