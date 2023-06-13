from rest_framework import serializers
from .models import Reservation, Checkin


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation


class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkin
