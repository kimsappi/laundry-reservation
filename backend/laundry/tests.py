import urllib
import json

from django.test import TestCase, Client

from .views import Reservations
from .models import Machine, Reservation

# Create your tests here.

c = Client()

MACHINE_NAME = 'TestMachine'
CANCEL_CODE = 'TestCancelCode'
OWNER = 'A42'
RESERVATIONS_ENDPOINT = '/api/reservations'
EXAMPLE_TEST_CASE = {
  'time': '2018-06-29 08:15:27.243860',
  'machine': MACHINE_NAME,
  'cancelCode': CANCEL_CODE,
  'owner': OWNER
}

def readContent(res):
  return json.loads(res.content.decode('utf-8'))

def getReservations():
  return c.get(RESERVATIONS_ENDPOINT)

def putReservation():
  return c.put(RESERVATIONS_ENDPOINT, json.dumps([EXAMPLE_TEST_CASE]).encode('utf-8'))

class CreateSlotTestCase(TestCase):
  def setUp(self):
    Machine.objects.create(name=MACHINE_NAME)

  def testGet(self):
    res = getReservations()
    self.assertEqual(res.status_code, 200)
    body = readContent(res)
    db = list(Reservation.objects.values('time', 'machine', 'owner'))
    self.assertDictEqual(body, {'reservations': db})
  
  def testPut(self):
    res = putReservation()
    self.assertEqual(res.status_code, 201)
    body = readContent(res)
    self.assertDictEqual(body, {'success': [EXAMPLE_TEST_CASE['time']], 'failure': []})
    db = Reservation.objects.get(time=EXAMPLE_TEST_CASE['time'])
    self.assertEqual(db.owner, EXAMPLE_TEST_CASE['owner'])
