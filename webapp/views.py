from django.shortcuts import render
from .models import Flight, Hotel
from django.http import JsonResponse
from django.core import serializers
#from django.http import HttpResponse

def index(request):
    return render(request, 'home.html', {
         'flights': Flight.objects.all(),
         'hotels': Hotel.objects.all()
    })
    ### return HttpResponse("<h2>Hey</h2>")

def flightsApi(request):
    flights = Flight.objects.all()
    flights_serialized = serializers.serialize('json', flights)
    return JsonResponse(flights_serialized, safe=False)

def hotelsApi(request):
    hotels = Hotel.objects.all()
    hotels_serialized = serializers.serialize('json', hotels)
    return JsonResponse(hotels_serialized, safe=False)
