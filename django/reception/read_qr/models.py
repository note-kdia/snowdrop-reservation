import uuid

from django.db import models


class Reservation(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=100)
    name_kana = models.CharField(max_length=100)
    mail = models.CharField(max_length=200)
    party_size = models.PositiveSmallIntegerField(default=0)
    reserved_at = models.DateTimeField("datetime reserved", auto_now_add=True)
    notes = models.CharField(blank=True, max_length=500)

    def __str__(self):
        return self.name + " (" + str(self.checkin_sum()) + "/" + str(self.party_size) + ")"

    def checkin_sum(self):
        sum = 0
        checkin_list = self.checkin_set.all()
        for checkin in checkin_list:
            sum += checkin.checkin_size
        return sum


class Checkin(models.Model):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    checkin_size = models.PositiveSmallIntegerField(default=0)
    checkin_at = models.DateTimeField("datetime checkin-ed", auto_now_add=True)
    notes = models.CharField(blank=True, max_length=500)

    def __str__(self):
        return str(self.checkin_size) + " : " + self.reservation.__str__()
