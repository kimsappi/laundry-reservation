import logging
import json
from typing import List, Dict
from datetime import datetime, timedelta
import sys

from django.http import JsonResponse
from django.views.generic import View

from .models import Reservation, Machine
sys.path.append('..')
from config import Config

config = Config()

def getCurrentDisplayTime() -> Dict:
  now = datetime.now()
  if now.hour > getattr(config, '_lastSlot'):
    now = now + timedelta(days=1)
    now = now.replace(hour=0, minute=0, second=0)
  nowDate = now.date()
  return {
    'date': nowDate.isoformat(),
    'time': now.hour
  }

def getAllReservationsAsList() -> List:
  reservations = Reservation.getReservations()
  return list(reservations)

class Reservations(View):
  def get(self, request, *args, **kwargs):
    try:
      reservations = getAllReservationsAsList()
      currentTime = getCurrentDisplayTime()
      return JsonResponse({
        'reservations': reservations,
        'date': currentTime['date'],
        'time': currentTime['time']
      }, status=200)
    except Exception as e:
      logging.error(e)
      return JsonResponse({'error': 'Something went wrong'}, status=400)

  def post(self, request, *args, **kwargs):
    try:
      newResData = json.loads(request.body)
      cancelCode = newResData['cancelCode']
      owner = newResData['owner']

      newResObjs = [Reservation(
        date = r['date'][:10],
        time = r['time'],
        machine = Machine.objects.get(name=r['machine']),
        cancelCode = cancelCode,
        owner = owner
      ) for r in newResData['new']]

      cancelResObjs = [Reservation(
        date = r['date'][:10],
        time = r['time'],
        machine = Machine.objects.get(name=r['machine']),
        cancelCode = cancelCode,
        owner = owner
      ) for r in newResData['cancel']]

      success = []
      failure = []

      actionType = 'reservation'
      for r in newResObjs:
        try:
          r.save()
          success.append(r.createSuccessOrFailureDict(actionType))
        except Exception as e:
          logging.warning(e)
          failure.append(r.createSuccessOrFailureDict(actionType))

      actionType = 'cancellation'
      for r in cancelResObjs:
        try:
          Reservation.objects.get(
            date = r.date,
            time = r.time,
            machine = r.machine,
            cancelCode = cancelCode,
            owner = owner
          ).delete()
          success.append(r.createSuccessOrFailureDict(actionType))
        except:
          logging.warning(e)
          failure.append(r.createSuccessOrFailureDict(actionType))

      reservations = getAllReservationsAsList() 
      currentTime = getCurrentDisplayTime()

      return JsonResponse({
        'reservations': reservations,
        'date': currentTime['date'],
        'time': currentTime['time'],
        'success': success,
        'failure': failure
      }, status=200)
    except Exception as e:
      logging.error(repr(e))
      return JsonResponse({'error': 'Something went wrong'}, status=400)
