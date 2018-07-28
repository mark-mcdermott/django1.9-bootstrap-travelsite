from django.shortcuts import render
from .models import Flight, Hotel
#from django.http import HttpResponse

def index(request):
    return render(request, 'home.html', {
        'flights': Flight.objects.all(),
        'hotels': Hotel.objects.all()
    })
    # return HttpResponse("<h2>Hey</h2>")
