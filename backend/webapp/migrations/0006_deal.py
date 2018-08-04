# -*- coding: utf-8 -*-
# Generated by Django 1.9.13 on 2018-08-04 01:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0005_feedback'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('arrive_city', models.CharField(max_length=255)),
                ('arrive_state', models.CharField(max_length=2)),
                ('arrive_datetime', models.DateTimeField(default='')),
                ('depart_city', models.CharField(max_length=255)),
                ('depart_state', models.CharField(max_length=2)),
                ('depart_datetime', models.DateTimeField(default='')),
                ('price_low', models.DecimalField(decimal_places=2, max_digits=6)),
                ('price_high', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
    ]
