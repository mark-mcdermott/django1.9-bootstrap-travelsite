from django.shortcuts import render
from .models import Flight, Hotel, Booking, Reservation, Feedback
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
        return HttpResponse("booking post request")

@csrf_exempt
def reservationApi(request):
    if request.method == "POST":
        r = Reservation(
            cust_name = request.POST.get("cust_name", ""),
            credit_type = request.POST.get("credit_type", ""),
            credit_name = request.POST.get("credit_name", ""),
            credit_number = request.POST.get("credit_number", ""),
            credit_expiration = request.POST.get("credit_expiration", ""),
            credit_security = request.POST.get("credit_security", ""),
            num_rooms = request.POST.get("num_rooms", ""),
            num_occupant = request.POST.get("num_occupant", ""),
            hotel_name = request.POST.get("hotel_name", ""),
            hotel_street = request.POST.get("hotel_street", ""),
            hotel_city = request.POST.get("hotel_city", ""),
            hotel_state = request.POST.get("hotel_state", ""),
            hotel_zip = request.POST.get("hotel_zip", ""),
            hotel_price = request.POST.get("hotel_price", ""),
            arrive_datetime = request.POST.get("arrive_datetime", ""),
            depart_datetime = request.POST.get("depart_datetime", ""),
        )
        r.save()
        return HttpResponse("reservation post request")

@csrf_exempt
def feedbackApi(request):
    if request.method == "POST":
        f = Feedback(
            feedback_text = request.POST.get("feedback_text", ""),
            feedback_rating = request.POST.get("feedback_rating", ""),
        )
        f.save()
        return HttpResponse("feedback post request")

@csrf_exempt
def historyApi(request):
    return HttpResponse("history api stub")

@csrf_exempt
def dealsApi(request):
    return HttpResponse("deals api stub")

@csrf_exempt
def createUserApi(request):
    return HttpResponse("create user api stub")

@csrf_exempt
def getUserApi(request):
    return HttpResponse("get user api stub")

@csrf_exempt
def getFlightStatusApi(request):
    return HttpResponse("get flight status api stub")
