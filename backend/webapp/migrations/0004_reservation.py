# -*- coding: utf-8 -*-
# Generated by Django 1.9.13 on 2018-08-04 00:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0003_booking'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cust_name', models.CharField(max_length=255)),
                ('credit_type', models.CharField(max_length=255)),
                ('credit_name', models.CharField(max_length=255)),
                ('credit_number', models.IntegerField()),
                ('credit_expiration', models.DateTimeField(default='')),
                ('credit_security', models.IntegerField()),
                ('num_rooms', models.IntegerField()),
                ('num_occupant', models.IntegerField()),
                ('hotel_name', models.CharField(max_length=255)),
                ('hotel_street', models.CharField(max_length=255)),
                ('hotel_city', models.CharField(max_length=255)),
                ('hotel_state', models.CharField(max_length=2)),
                ('hotel_zip', models.IntegerField()),
                ('hotel_price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('arrive_datetime', models.DateTimeField(default='')),
                ('depart_datetime', models.DateTimeField(default='')),
            ],
        ),
    ]