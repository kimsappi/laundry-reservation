import urllib
import json

from django.test import TestCase

from .views import Reservations
from .models import Machine

# Create your tests here.

MACHINE_NAME = 'TestMachine'
CANCEL_CODE = 'TestCancelCode'
OWNER = 'A42'

class CreateSlotTestCase(TestCase):
  def setUp(self):
    Machine.objects.create(name=MACHINE_NAME)

  def testCreation(self):
    req = urllib.request.Request(
      'http://localhost:8000/api/reservations',
      data=json.dumps({
        'time': '2018-06-29 08:15:27.243860',
        'machine': MACHINE_NAME,
        'cancelCode': CANCEL_CODE,
        'owner': OWNER
      }).encode('utf-8'),
      method='CREATE'
    )
    with urllib.request.urlopen(req) as res:
      print(res)
