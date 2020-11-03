from django.db import models
from typing import Dict

# Create your models here.

class Machine(models.Model):
  name = models.CharField(max_length=32, unique=True)

  def __str__(self):
    return f'{self.name}'

class Owner(models.Model):
  name = models.CharField(max_length=64, unique=True)

  def __str__(self):
    return f'{self.name}'

class Reservation(models.Model):
  date = models.DateField()
  time = models.SmallIntegerField()
  machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
  cancelCode = models.CharField(max_length=64)
  owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

  def createSuccessOrFailureDict(self, actionType: str) -> Dict:
    return {
      'type': actionType,
      'date': self.date,
      'time': self.time,
      'machine': str(self.machine)
    }

  def __str__(self):
    return f'''\
  time: {self.time}
  machine: {str(self.machine)}
  cancelCode: {self.cancelCode}
  owner: {self.owner}\
'''

  def getReservations(startDate, endDate):
    reservations = Reservation \
      .objects \
      .values('date', 'time', 'machine__name', 'owner') \
      .filter(
        machine__isnull=False,
        date__range=[startDate, endDate]
      )

    for reservation in reservations:
      reservation['machine'] = reservation.pop('machine__name')
    return reservations

  class Meta:
    unique_together = (('date', 'time', 'machine'),)
