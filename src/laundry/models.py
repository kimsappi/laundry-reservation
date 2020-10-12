from django.db import models

# Create your models here.

class Machine(models.Model):
  name = models.CharField(max_length=32)

  def __str__(self):
    return f'{self.name}'

class Reservation(models.Model):
  time = models.DateTimeField()
  machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
  cancelCode = models.CharField(max_length=64)
  owner = models.CharField(max_length=64)

  def __str__(self):
    return f'''\
  time: {self.time}
  machine: {str(self.machine)}
  cancelCode: {self.cancelCode}
  owner: {self.owner}\
'''

  class Meta:
    unique_together = (('time', 'machine'),)
