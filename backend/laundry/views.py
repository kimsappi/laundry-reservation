import logging
import json

from django.http import JsonResponse
from django.views.generic import View

from .models import Reservation, Machine

class Reservations(View):
  def get(self, request, *args, **kwargs):
    try:
      reservations = Reservation.objects.values('time', 'machine', 'owner')
      return JsonResponse({'reservations': list(reservations)})
    except Exception as e:
      logging.error(e)
      return JsonResponse({'error': 'Something went wrong'}, status=400)

  def post(self, request, *args, **kwargs):
    try:
      newResData = json.loads(request.body)
      newResObjs = [Reservation(
        time = r['time'],
        machine = Machine.objects.get(name=r['machine']),
        cancelCode = r['cancelCode'],
        owner = r['owner']
      ) for r in newResData]

      success = []
      failure = []
      for r in newResObjs:
        try:
          r.save()
          success.append(r.time)
        except:
          failure.append(r.time)
      return JsonResponse({'success': success, 'failure': failure}, status=201)
    except Exception as e:
      logging.error(e)
      return JsonResponse({'error': 'Something went wrong'}, status=400)
