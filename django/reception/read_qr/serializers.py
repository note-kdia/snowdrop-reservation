from rest_framework import serializers
from .models import Reservation, Checkin


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = (
            "id",
            "name",
            "name_kana",
            "mail",
            "party_size",
            "reserved_at",
            "notes",
            "checkin_set",
            "checkin_sum",
        )


class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkin
        fields = ("id", "reservation", "checkin_size", "checkin_at", "notes")
