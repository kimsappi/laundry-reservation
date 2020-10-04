from django.http import JsonResponse
from django.views.generic import View

# Create your views here.

class Reservations(View):
  def get(self, request, *args, **kwargs):
    return JsonResponse({'reservations': []})

  def create(self, request, *args, **kwargs):
    return JsonResponse({'message': 'Trying to create reservations'})
