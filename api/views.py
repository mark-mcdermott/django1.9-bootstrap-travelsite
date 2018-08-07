# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User

from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import (City, Hotel, Occupancy, Airline, Flight, 
    FlightInstance, Address, Payment, Transaction, Booking, Reservation,
    Feedback, Profile)
from api.serializers import (CitySerializer, HotelSerializer, 
    OccupancySerializer, AirlineSerializer, FlightSerializer, 
    FlightInstanceSerializer, AddressSerializer, PaymentSerializer, 
    TransactionSerializer, BookingSerializer, ReservationSerializer, 
    FeedbackSerializer, ProfileSerializer)


class CityViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = City.objects.all()
    serializer_class = CitySerializer


class HotelViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class OccupancyViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Occupancy.objects.all()
    serializer_class = OccupancySerializer


class AirlineViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer


class FlightViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
 

class FlightInstanceViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = FlightInstance.objects.all()
    serializer_class = FlightInstanceSerializer


class AddressViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class BookingViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class FeedbackViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy
    """
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

#   lookup_field = 'airline'

#   permission_classes = (permissions.AllowAny, )
