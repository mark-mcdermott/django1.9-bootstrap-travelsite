from django.shortcuts import render
from .models import Flight, Hotel, Booking, Reservation, Feedback, Deal, User, Status
from django.http import JsonResponse
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import time

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
        date = request.GET.get('date', '')
        #fmt = '%Y-%m-%d %H:%M'
        fmt = '%Y-%m-%d'
        date_datetime = datetime.strptime(date, fmt)
        day = date_datetime.date()
        returndate = request.GET.get('returndate', '')
        returndate_datetime = datetime.strptime(returndate, fmt)
        returndate_day = returndate_datetime.date()
        passengers = request.GET.get('passengers', '')
        if fromcity is '' and tocity is '':
            flights = Flight.objects.all()
        elif tocity is '':
            flights = Flight.objects.filter(depart_city__iexact=fromcity)
        elif fromcity is '':
            flights = Flight.objects.filter(arrive_city__iexact=tocity)
        else:
            flights = Flight.objects.filter(depart_city__iexact=fromcity,arrive_city__iexact=tocity,depart_datetime__date=day) | Flight.objects.filter(depart_city__iexact=tocity,arrive_city__iexact=fromcity,depart_datetime__date=returndate_day)
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
def dealsApi(request):
    if request.method == "GET":
        city = request.GET.get('city', '')
        if city is '':
            deals = Deal.objects.all()
        else:
            deals = Deal.objects.filter(arrive_city__iexact=city)
        deals_serialized = serializers.serialize('json', deals)
        return JsonResponse(deals_serialized, safe=False)
    elif request.method == "POST":
        d = Deal(
            arrive_city = request.POST.get("arrive_city", ""),
            arrive_state = request.POST.get("arrive_state", ""),
            arrive_datetime = request.POST.get("arrive_datetime", ""),
            depart_city = request.POST.get("depart_city", ""),
            depart_state = request.POST.get("depart_state", ""),
            depart_datetime = request.POST.get("depart_datetime", ""),
            price_low = request.POST.get("price_low", ""),
            price_high = request.POST.get("price_high", "")
        )
        d.save()
        return HttpResponse("deals post request")

@csrf_exempt
def createUserApi(request):
    if request.method == "POST":
        u = User(
            username = request.POST.get("username", ""),
            email = request.POST.get("email", ""),
            password = request.POST.get("password", ""),
            name_first = request.POST.get("name_first", ""),
            name_middle = request.POST.get("name_middle", ""),
            name_last = request.POST.get("name_last", ""),
            address_street = request.POST.get("address_street", ""),
            address_city = request.POST.get("address_city", ""),
            address_state = request.POST.get("address_state", ""),
            address_zip = request.POST.get("address_zip", ""),
            credit_type = request.POST.get("credit_type", ""),
            credit_name = request.POST.get("credit_name", ""),
            credit_number = request.POST.get("credit_number", ""),
            credit_expiration = request.POST.get("credit_expiration", ""),
            credit_security = request.POST.get("credit_security", "")
        )
        u.save()
        return HttpResponse("create user post request!")

@csrf_exempt
def getUserApi(request):
    if request.method == "GET":
        user = request.GET.get('user', '')
        if user is '':
            users = User.objects.all()
        else:
            users = User.objects.filter(cust_name__iexact=user)
        users_serialized = serializers.serialize('json', users)
        return JsonResponse(users_serialized, safe=False)
    elif request.method == "POST":
        return HttpResponse("post request")
    return HttpResponse("get user api stub")

@csrf_exempt
def getFlightStatusApi(request):
    if request.method == "GET":
        flightId = request.GET.get('flight', '')
        if flightId is '':
            return HttpResponse("get request did not include flight id.  For example (http://localhost:8000/get-flight-status-api?flight=1)")
        else:
            fmt = '%Y-%m-%d %H:%M'
            flight = Flight.objects.get(flight_id=flightId)
            expected = flight.arrive_datetime
            estimated = flight.est_arrive_datetime
            difference = int((estimated - expected).total_seconds() / 60)
            if difference < -5:
                status = str(abs(difference)) + ' minutes early'
            elif difference > 5:
                status = str(difference) + ' minutes late'
            else:
                status = 'on time'
            return HttpResponse(status)
    elif request.method == "POST":
        return HttpResponse("post get flight status request")

@csrf_exempt
def historyApi(request):
    if request.method == "GET":
        user = request.GET.get('user', '')
        if user is '':
            bookings = Booking.objects.all()
        else:
            bookings = Booking.objects.filter(cust_name__iexact=user)
        bookings_serialized = serializers.serialize('json', bookings)
        return JsonResponse(bookings_serialized, safe=False)
    elif request.method == "POST":
        return HttpResponse("history post request")

@csrf_exempt
def loginApi(request):
    if request.method == "POST":
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        user = User.objects.filter(username=username,password=password)
        if user:
            user_serialized = serializers.serialize('json', user)
            return JsonResponse(user_serialized, safe=False)
        else:
            return HttpResponse('no matching email & password in database')
