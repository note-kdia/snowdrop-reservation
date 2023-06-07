import uuid

from django.db import models


class Reservation(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=100)
    name_kana = models.CharField(max_length=100)
    mail = models.CharField(max_length=200)
    party_size = models.IntegerField(default=0)
    reserved_at = models.DateTimeField("datetime reserved")
    notes = models.CharField(max_length=500)

    def __str__(self):
        return self.name_kana + "(" + str(self.party_size) + ")"


class Checkin(models.Model):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    checkin_size = models.IntegerField(default=0)
    checkin_at = models.DateTimeField("datetime checkin-ed")
    notes = models.CharField(max_length=500)
