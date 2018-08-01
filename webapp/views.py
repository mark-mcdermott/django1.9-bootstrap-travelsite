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

def flightsApi(request):
    if request.method == "GET":
        fromcity = request.GET.get('fromcity', '')
        tocity = request.GET.get('tocity', '')
        if fromcity is '' and tocity is '':
            flights = Flight.objects.all()
        elif fromcity is not '' and tocity is not '':
            flights = Flight.objects.filter(depart_city__iexact=fromcity,arrive_city__iexact=tocity)
        elif fromcity is '':
            flights = Flight.objects.filter(arrive_city__iexact=tocity)
        elif tocity is '':
            flights = Flight.objects.filter(depart_city__iexact=fromcity)
        if not flights:
            return HttpResponse("no matches in database")
        else:
            flights_serialized = serializers.serialize('json', flights)
            return JsonResponse(flights_serialized, safe=False)
    elif request.method == "POST":
        return HttpResponse("post request")

def hotelsApi(request):
    if request.method == "GET":
        city = request.GET.get('city', '')
        if city is '':
            hotels = Hotel.objects.all()
        else:
            hotels = Hotel.objects.filter(city__iexact=city)
        if not hotels:
            return HttpResponse("no matches in database")
        else:
            hotels_serialized = serializers.serialize('json', hotels)
            return JsonResponse(hotels_serialized, safe=False)
    elif request.method == "POST":
        return HttpResponse("post request")
