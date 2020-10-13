import logging

from django.http import JsonResponse
from django.views.generic import View

from .models import Reservation

# Create your views here.

class Reservations(View):
  def get(self, request, *args, **kwargs):
    try:
      reservations = Reservation.objects.values('time', 'machine', 'owner')
      return JsonResponse({'reservations': list(reservations)})
    except Exception as e:
      logging.error(e)
      return JsonResponse({'error': 'Something went wrong'}, status=400)

  def create(self, request, *args, **kwargs):
    return JsonResponse({'message': 'Trying to create reservations'})
