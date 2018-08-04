from __future__ import unicode_literals
from django.utils import timezone
from django.db import models

class Flight(models.Model):
    depart_city = models.CharField(max_length=255)
    depart_state = models.CharField(max_length=2)
    depart_datetime = models.DateTimeField(default='')
    arrive_city = models.CharField(max_length=255)
    arrive_state = models.CharField(max_length=2)
    arrive_datetime = models.DateTimeField(default='')
    price = models.DecimalField(max_digits=6, decimal_places=2)

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
