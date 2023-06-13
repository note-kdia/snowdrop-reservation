from rest_framework import viewsets, routers
from .models import Reservation
from .serializers import ReservationSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


router = routers.DefaultRouter()
router.register(r'reservations', ReservationViewSet)
