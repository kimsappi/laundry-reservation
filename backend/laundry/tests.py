import urllib
import json
import datetime

from django.test import TestCase, Client

from .views import Reservations, getCurrentDisplayTime
from .models import Machine, Reservation, Owner

# Create your tests here.

c = Client()

MACHINE_NAME = 'TestMachine'
CANCEL_CODE = 'TestCancelCode'
OWNER = 'A 42'
RESERVATIONS_ENDPOINT = '/api/reservations'
EXAMPLE_TEST_CASE = {
  'date': '2020-11-03',
  'time': 15,
  'machine': MACHINE_NAME,
  'cancelCode': CANCEL_CODE,
  'owner': OWNER
}
# Tests will fail if run at n:59:59...
CURRENT_TIME = getCurrentDisplayTime()

def readContent(res):
  return json.loads(res.content.decode('utf-8'))

def getReservations():
  return c.get(RESERVATIONS_ENDPOINT)

def putReservation(owner, cancelCode, reservations, cancellations):
  return c.post(
    RESERVATIONS_ENDPOINT,
    data=json.dumps({
      'owner': owner, 'cancelCode': cancelCode,
      'new': reservations, 'cancel': cancellations
    }),
    content_type='application/json'
  )

class CreateSlotTestCase(TestCase):
  def setUp(self):
    Machine.objects.create(name=MACHINE_NAME)
    Owner.objects.create(name=OWNER)

  def testGet(self):
    res = getReservations()
    self.assertEqual(res.status_code, 200)
    body = readContent(res)
    db = list(Reservation.objects.values('time', 'machine', 'owner'))
    self.assertDictEqual(body, {
      'date': CURRENT_TIME['date'],
      'reservations': db,
      'time': CURRENT_TIME['time']
    })
  
  def testPut(self):
    res = putReservation(EXAMPLE_TEST_CASE['owner'], EXAMPLE_TEST_CASE['cancelCode'], [{'time': EXAMPLE_TEST_CASE['time'], 'date': EXAMPLE_TEST_CASE['date'], 'machine': EXAMPLE_TEST_CASE['machine']}], [])
    self.assertEqual(res.status_code, 200)
    body = readContent(res)
    self.assertDictEqual(body['success'][0], {'date': EXAMPLE_TEST_CASE['date'], 'time': EXAMPLE_TEST_CASE['time'], 'machine': MACHINE_NAME, 'type': 'reservation'})
    db = Reservation.objects.get(date=EXAMPLE_TEST_CASE['date'], time=EXAMPLE_TEST_CASE['time'])
    self.assertEqual(str(db.owner), EXAMPLE_TEST_CASE['owner'])
