# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
# from django.contrib.gis.db.models import PointField
# from django.contrib.gis.geos import GEOSGeometry # distance

import uuid

class City(models.Model):
    name = models.CharField(max_length=30)
    state = models.CharField('state or provence', max_length=30)
    country = models.CharField('country abbreviation', max_length=2)
    # location = PointField(help_text="Coords(Lon,Lat)", blank=True)

class Airline(models.Model):
    name = models.CharField(max_length=30)

class Flight(models.Model):
    flight_number = models.CharField(max_length=20, blank=False, unique=True)
    airline = models.ForeignKey(Airline, null=False, blank=False)
    source = models.ForeignKey(
        City, related_name='departing', null=False, blank=False)
    destination = models.ForeignKey(
        City, related_name='arriving', null=False, blank=False)
    departure_time = models.TimeField(
        auto_now_add=False, auto_now=False, null=False, blank=False)
    arrival_time = models.TimeField(
        auto_now_add=False, auto_now=False, null=False, blank=False)
    miles = models.PositiveSmallIntegerField(
        default=1000, null=False, blank=False)
    international = models.BooleanField(default=False)

class FlightInstance(models.Model):
    flight = models.ForeignKey(Flight, null=False, blank=False)
    date = models.DateField(
        auto_now_add=False, auto_now=False, null=True, blank=True)

    STATUS = (
        ('FF', 'Future Flight'),
        ('IF', 'In Flight'),
        ('AR', 'Arrived'),
        ('DL', 'Delayed'),
    )

    status = models.CharField(
        'status', max_length=2, choices=STATUS, default='FF')

class Hotel(models.Model):
    name = models.CharField(max_length=30, blank=False)
    cities = models.ManyToManyField(City)
    number_of_rooms = models.PositiveSmallIntegerField(
        default=20, null=False, blank=False)

class Occupancy(models.Model):
    hotel = models.ForeignKey(
        City, related_name='occupied_rooms', null=False, blank=False)
    date = models.DateField(null=True, blank=True)
    occupancy_count = models.PositiveSmallIntegerField(
        default=0, null=False, blank=False)

class Address(models.Model):
    # user (fk)
    street_number = models.CharField(max_length=30)
    street_name = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    state_provence = models.CharField(max_length=30)
    postal_code = models.CharField(max_length=30)
    country = models.CharField(max_length=30)

    TYPES = (
        ('B', 'billing'),
        ('M', 'mailing'),
    )

    address_type = models.CharField(
        'address type', max_length=2, choices=TYPES, default='B')

class CreditCard(models.Model):
    # user (fk)
    TYPES = (
        ('VS', 'Visa'),
        ('AE', 'American Express'),
        ('MC', 'MasterCard'),
    )
    card_type = models.CharField(
        'type', max_length=2, choices=TYPES, default='MC')
    number = models.CharField(max_length=19, blank=False)
    name = models.CharField(max_length=60, blank=False)
    expiration = models.DateField(null=False, blank=False)
    billing_address = models.ForeignKey(Address, null=False, blank=False)

class Transaction(models.Model):
    # user (fk)
    number = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    datetime = models.DateTimeField(auto_now_add=True)
    credit_card = models.ForeignKey(
        CreditCard, related_name='transactions', null=False, blank=False)
    discount = models.DecimalField(max_digits=4, decimal_places=2)
    tax = models.DecimalField(max_digits=4, decimal_places=2)
    total = models.DecimalField(max_digits=4, decimal_places=2)

class Booking(models.Model):
    # user (fk)
    transaction = models.ForeignKey(
        Transaction, null=False, blank=False)
    flight = models.ForeignKey(
        Flight, null=False, blank=False)

class Reservation(models.Model):
    # user (fk)
    hotel = models.ForeignKey(
        City, null=False, blank=False)
    rooms = models.PositiveSmallIntegerField(
        default=1, null=False, blank=False)
    guests = models.PositiveSmallIntegerField(
        default=1, null=False, blank=False)
    check_in_date = models.DateField(null=True, blank=True)
    days = models.PositiveSmallIntegerField(
        default=1, null=False, blank=False)
    transaction = models.ForeignKey(
        Transaction, null=False, blank=False)

class Feedback(models.Model):
    # user (fk)
    datetime = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)
    rating = models.PositiveSmallIntegerField(
        default=5, null=False, blank=False)
