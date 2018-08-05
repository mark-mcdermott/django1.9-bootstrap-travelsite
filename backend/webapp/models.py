from __future__ import unicode_literals
from django.utils import timezone
from django.db import models

class Flight(models.Model):
    flight_id = models.IntegerField()
    depart_city = models.CharField(max_length=255)
    depart_state = models.CharField(max_length=2)
    depart_datetime = models.DateTimeField(default='')
    arrive_city = models.CharField(max_length=255)
    arrive_state = models.CharField(max_length=2)
    arrive_datetime = models.DateTimeField(default='')
    est_arrive_datetime = models.DateTimeField(default='')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    intl = models.BooleanField()

class Hotel(models.Model):
    name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2)
    zip = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

class Booking(models.Model):
    cust_name = models.CharField(max_length=255)
    airline_name = models.CharField(max_length=255)
    credit_type = models.CharField(max_length=255)
    credit_name = models.CharField(max_length=255)
    credit_number = models.IntegerField()
    credit_expiration = models.DateTimeField(default='')
    credit_security = models.IntegerField()
    depart_city = models.CharField(max_length=255)
    depart_state = models.CharField(max_length=2)
    depart_datetime = models.DateTimeField(default='')
    arrive_city = models.CharField(max_length=255)
    arrive_state = models.CharField(max_length=2)
    arrive_datetime = models.DateTimeField(default='')
    num_passengers = models.IntegerField()
    mileage = models.IntegerField()

class Reservation(models.Model):
    cust_name = models.CharField(max_length=255)
    credit_type = models.CharField(max_length=255)
    credit_name = models.CharField(max_length=255)
    credit_number = models.IntegerField()
    credit_expiration = models.DateTimeField(default='')
    credit_security = models.IntegerField()
    num_rooms = models.IntegerField()
    num_occupant = models.IntegerField()
    hotel_name = models.CharField(max_length=255)
    hotel_street = models.CharField(max_length=255)
    hotel_city = models.CharField(max_length=255)
    hotel_state = models.CharField(max_length=2)
    hotel_zip = models.IntegerField()
    hotel_price = models.DecimalField(max_digits=6, decimal_places=2)
    arrive_datetime = models.DateTimeField(default='')
    depart_datetime = models.DateTimeField(default='')

class Feedback(models.Model):
    feedback_text = models.TextField()
    feedback_rating = models.IntegerField()

class Deal(models.Model):
    username = models.CharField(max_length=255)
    arrive_city = models.CharField(max_length=255)
    arrive_state = models.CharField(max_length=2)
    arrive_datetime = models.DateTimeField(default='')
    depart_city = models.CharField(max_length=255)
    depart_state = models.CharField(max_length=2)
    depart_datetime = models.DateTimeField(default='')
    airline_name = models.CharField(max_length=255)
    hotel_name = models.CharField(max_length=255)
    hotel_street = models.CharField(max_length=255)
    hotel_city = models.CharField(max_length=255)
    hotel_state = models.CharField(max_length=2)
    hotel_zip = models.IntegerField()
    price_low = models.DecimalField(max_digits=6, decimal_places=2)
    price_high = models.DecimalField(max_digits=6, decimal_places=2)

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    name_first = models.CharField(max_length=255)
    name_middle = models.CharField(max_length=255)
    name_last = models.CharField(max_length=255)
    address_street = models.CharField(max_length=255)
    address_city = models.CharField(max_length=255)
    address_state = models.CharField(max_length=255)
    address_zip = models.CharField(max_length=255)
    credit_type = models.CharField(max_length=255)
    credit_name = models.CharField(max_length=255)
    credit_number = models.IntegerField()
    credit_expiration = models.DateTimeField(default='')
    credit_security = models.IntegerField()

class Status(models.Model):
    status = models.CharField(max_length=255)
