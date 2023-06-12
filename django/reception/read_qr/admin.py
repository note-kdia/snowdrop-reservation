from django.contrib import admin

from .models import Checkin, Reservation

admin.site.register(Reservation)
admin.site.register(Checkin)
