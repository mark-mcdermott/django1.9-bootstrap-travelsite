# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

########
# City #
########

class City(models.Model):
    name = models.CharField(max_length=30)
    state = models.CharField('state or provence', max_length=30)
    country = models.CharField('country abbreviation', max_length=2)

    class Meta:
        verbose_name_plural = "Cities"

    def __str__(self):
        return "%s, %s" % (self.name, self.state)

#########
# Hotel #
#########

class Hotel(models.Model):
    name = models.CharField(max_length=30)
    cities = models.ManyToManyField(City)
    number_of_rooms = models.PositiveSmallIntegerField(default=20)

    class Meta:
        verbose_name_plural = "Hotels"

    def __str__(self):
        return self.name

#############
# Occupancy #
#############

class Occupancy(models.Model):
    hotel = models.ForeignKey(Hotel, related_name='occupied')
    date = models.DateField()
    count = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return "%s %s %s guests" % (self.hotel.name, self.date, self.count)

###########
# Airline #
###########

class Airline(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

##########
# Flight #
##########

class Flight(models.Model):
    number = models.CharField(max_length=6)
    airline = models.ForeignKey(Airline)
    source = models.ForeignKey(City, related_name='departures')
    destination = models.ForeignKey(City, related_name='arrivals')
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    miles = models.PositiveSmallIntegerField(default=1000)
    international = models.BooleanField(default=False)

    @property
    def flight_number(self):
        return "%s %s" % (self.airline, self.number)

    class Meta:
        verbose_name_plural = "Flights"
        unique_together = ('number', 'airline')


    def __str__(self):
        return "%s %s" % (self.airline, self.number)

###################
# Flight Instance #
###################

class FlightInstance(models.Model):
    flight = models.ForeignKey(Flight, related_name="instances")
    capacity = models.PositiveSmallIntegerField(default=80)
    # TODO seats booked, remaining ... 
    date = models.DateField()

    STATUS = (
        ('FF', 'Future Flight'),
        ('IF', 'In Flight'),
        ('AR', 'Arrived'),
        ('DL', 'Delayed'),
    )

    status = models.CharField(
        'status', max_length=2, choices=STATUS, default='FF')

    class Meta:
        verbose_name = "Flight Instance"
        verbose_name_plural = "Flight Instances"

    def __str__(self):
        return "%s %s" % (self.flight, self.date)

###########
# Profile #
###########

class Profile(models.Model):
    user = models.OneToOneField(User)
    mileage = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Profiles"

    def __str__(self):
        return "%s" % (self.user.username)

###########
# Address #
###########

class Address(models.Model):
    profile = models.ForeignKey(
        Profile, related_name="addresses", null=True, blank=True)
    street_number = models.CharField(max_length=6)
    street_name = models.CharField(max_length=30)
    city = models.CharField(max_length=20)
    state_provence = models.CharField(max_length=20)
    postal_code = models.CharField(max_length=15)
    country = models.CharField(max_length=20)

    TYPES = (
        ('B', 'billing'),
        ('M', 'mailing'),
    )

    address_type = models.CharField(
        'address type', max_length=2, choices=TYPES, default='B')

    class Meta:
        verbose_name_plural = "Addresses"

    def __str__(self):
        return "%s %s" % (self.street_number, self.street_name)

###########
# Payment #
###########

class Payment(models.Model):
    profile = models.ForeignKey(
        Profile, related_name="payment_methods", null=True, blank=True)
    TYPES = (
        ('VS', 'Visa'),
        ('AE', 'American Express'),
        ('MC', 'MasterCard'),
    )
    card_type = models.CharField(
        'card type', max_length=2, choices=TYPES, default='MC')
    number = models.CharField(max_length=16)
    cvc = models.CharField(max_length=3)
    name = models.CharField(max_length=60)
    expiration = models.DateField()
    # billing_address = models.ForeignKey(Address)
    # billing_address = models.OneToOneField(Address)

    class Meta:
        verbose_name_plural = "Payment Methods"

    def __str__(self):
        last_four = '0000' if (len(self.number) < 4) else self.number[-4:]
        return "%s %s" % (self.card_type, last_four)

###############
# Transaction #
###############

class Transaction(models.Model):
    profile = models.ForeignKey(Profile, related_name='transactions')
    # number = models.UUIDField(
    #     primary_key=True, default=uuid.uuid4, editable=False)
    datetime = models.DateTimeField(auto_now_add=True)
    credit_card = models.ForeignKey(Payment, related_name='transactions')
    discount = models.DecimalField(max_digits=4, decimal_places=2)
    tax = models.DecimalField(max_digits=4, decimal_places=2)
    total = models.DecimalField(max_digits=4, decimal_places=2)

    class Meta:
        ordering = ["datetime"]
        verbose_name_plural = "Transactions"

    def __str__(self):
        return str(self.id)

###########
# Booking #
###########

class Booking(models.Model):
    profile = models.ForeignKey(Profile, related_name='bookings')
    transaction = models.ForeignKey(
        Transaction, related_name='bookings', null=True, blank=True)
    # flightinstances = models.ManyToManyField(
    #     FlightInstance, null=True, blank=True)
    out = models.ForeignKey(
        FlightInstance, related_name="first_bookings", null=True, blank=True)
    back = models.ForeignKey(
        FlightInstance, related_name="second_bookings", null=True, blank=True)

    class Meta:
        verbose_name_plural = "Bookings"

    def __str__(self):
        s = ""
        try:
            out = self.flightinstances.objects.first()
            s = "%s - %s on %s" % (
                out.flight.source.name,
                out.flight.destination.name,
                out.date)
        except:
            s = str(self.id)

        return s

###############
# Reservation #
###############

class Reservation(models.Model):
    profile = models.ForeignKey(Profile, related_name='reservations')
    hotel = models.ForeignKey(City)
    rooms = models.PositiveSmallIntegerField(default=1)
    guests = models.PositiveSmallIntegerField(default=1)
    check_in_date = models.DateField()
    duration = models.PositiveSmallIntegerField(default=1)
    transaction = models.ForeignKey(
        Transaction, related_name='reservations', null=True, blank=True)

    class Meta:
        verbose_name_plural = "Bookings"

    def __str__(self):
        return "%s %s" % (self.hotel.name, self.check_id_date)

############
# Feedback #
############

class Feedback(models.Model):
    profile = models.ForeignKey(Profile, related_name='feedback')
    datetime = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)

    def __str__(self):
        return "%s -- %s stars" % (self.comment, self.rating)
