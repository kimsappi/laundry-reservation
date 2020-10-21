# Generated by Django 3.1.2 on 2020-10-21 19:50

import json
import os.path
from django.db import migrations

from ..models import Machine

def initialiseMachines(apps, _schemaEditor):
    with open(os.path.dirname(__file__) + '/../../../config.json') as f:
        config = json.loads(f.read())
    machines = config['machines']
    for machine in machines:
        newMachine = Machine(name=machine['fullName'])
        newMachine.save()

class Migration(migrations.Migration):

    dependencies = [
        ('laundry', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(initialiseMachines)
    ]
