import logging
import json

from django.http import JsonResponse
from django.views.generic import View

from .models import Reservation, Machine

class Reservations(View):
  def get(self, request, *args, **kwargs):
    try:
      reservations = Reservation.getReservations()
      return JsonResponse({'reservations': list(reservations)})
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
      for r in newResObjs:
        try:
          r.save()
          success.append(r.time)
        except Exception as e:
          logging.warning(e)
          failure.append(r.time)
      return JsonResponse({'success': success, 'failure': failure}, status=200)
    except Exception as e:
      logging.error(repr(e))
      return JsonResponse({'error': 'Something went wrong'}, status=400)
