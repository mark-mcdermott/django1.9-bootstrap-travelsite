# -*- coding: utf-8 -*-
# Generated by Django 1.9.13 on 2018-08-04 09:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0008_auto_20180804_0920'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='credit_exp',
            new_name='cred_exp',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='credit_name',
            new_name='cred_name',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='credit_number',
            new_name='cred_number',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='credit_security',
            new_name='cred_security',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='credit_type',
            new_name='cred_type',
        ),
    ]
