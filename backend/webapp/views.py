from django.shortcuts import render
from .models import Flight, Hotel, Booking
from django.http import JsonResponse
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'home.html', {
         'flights': Flight.objects.all(),
         'hotels': Hotel.objects.all()
    })

@csrf_exempt
def flightsApi(request):
    if request.method == "GET":
        fromcity = request.GET.get('fromcity', '')
        tocity = request.GET.get('tocity', '')
        if fromcity is '' and tocity is '':
            flights = Flight.objects.all()
        elif tocity is '':
            flights = Flight.objects.filter(depart_city__iexact=fromcity)
        elif fromcity is '':
            flights = Flight.objects.filter(arrive_city__iexact=tocity)
        else:
            flights = Flight.objects.filter(depart_city__iexact=fromcity,arrive_city__iexact=tocity)
        flights_serialized = serializers.serialize('json', flights)
        # flights_serialized['Access-Control-Allow-Origin'] = '*'
        # flights_serialized['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        return JsonResponse(flights_serialized, safe=False)
    elif request.method == "POST":
        #return HttpResponse(request.POST.get("depart_city"))

        # f = Flight(
        #     depart_city = request.POST.get("depart_city", "")
        #     depart_state = request.POST.get("", ""),
        #     depart_datetime = '2018-11-30 13:01',
        #     arrive_city = 'Houston',
        #     arrive_state = 'TX',
        #     arrive_datetime = '2018-11-30 13:01',
        #     price = 100

            # depart_city='Austin',
            # depart_state = 'TX',
            # depart_datetime = '2018-11-30 13:01',
            # arrive_city = 'Houston',
            # arrive_state = 'TX',
            # arrive_datetime = '2018-11-30 13:01',
            # price = 100
        #)

        #f.save()
        return HttpResponse("post request")

def hotelsApi(request):
    if request.method == "GET":
        city = request.GET.get('city', '')
        if city is '':
            hotels = Hotel.objects.all()
        else:
            hotels = Hotel.objects.filter(city__iexact=city)
        hotels_serialized = serializers.serialize('json', hotels)
        return JsonResponse(hotels_serialized, safe=False)
    elif request.method == "POST":
        return HttpResponse("post request")

@csrf_exempt
def bookingApi(request):
    if request.method == "POST":
        b = Booking(
            cust_name = request.POST.get("cust_name", ""),
            airline_name = request.POST.get("airline_name", ""),
            credit_type = request.POST.get("credit_type", ""),
            credit_name = request.POST.get("credit_name", ""),
            credit_number = request.POST.get("credit_number", ""),
            credit_expiration = request.POST.get("credit_expiration", ""),
            credit_security = request.POST.get("credit_security", ""),
            depart_city = request.POST.get("depart_city", ""),
            depart_state = request.POST.get("depart_state", ""),
            depart_datetime = request.POST.get("depart_datetime", ""),
            arrive_city = request.POST.get("arrive_city", ""),
            arrive_state = request.POST.get("arrive_state", ""),
            arrive_datetime = request.POST.get("arrive_datetime", ""),
            num_passengers = request.POST.get("num_passengers", ""),
            mileage = request.POST.get("mileage", ""),
        )
        b.save()
        return HttpResponse("post request")

# stubs
def reservationApi(request):
    return HttpResponse("reservation api stub")
def feedbackApi(request):
    return HttpResponse("feedback api stub")
def historyApi(request):
    return HttpResponse("history api stub")
def dealsApi(request):
    return HttpResponse("deals api stub")
def createUserApi(request):
    return HttpResponse("create user api stub")
def getUserApi(request):
    return HttpResponse("get user api stub")
def getFlightStatusApi(request):
    return HttpResponse("get flight status api stub")
