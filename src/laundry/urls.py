from django.urls import path

from . import views

urlpatterns = [
  path('reservations', views.Reservations.as_view(), name='Reservations')
]
