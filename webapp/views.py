from django.shortcuts import render
from .models import Flight, Hotel
from django.http import JsonResponse
from django.core import serializers
from django.http import HttpResponse

def index(request):
    return render(request, 'home.html', {
         'flights': Flight.objects.all(),
         'hotels': Hotel.objects.all()
    })
    ### return HttpResponse("<h2>Hey</h2>")

def flightsApi(request,fromcity):
    #flights = Flight.objects.all()
    flights = Flight.objects.filter(depart_city=fromcity)
    flights_serialized = serializers.serialize('json', flights)
    return JsonResponse(flights_serialized, safe=False)

def hotelsApi(request,city):
    #city = city.lower()
    #hotels = Hotel.objects.all()
    hotels = Hotel.objects.filter(city=city)
    hotels_serialized = serializers.serialize('json', hotels)
    #return HttpResponse(city)
    return JsonResponse(hotels_serialized, safe=False)
