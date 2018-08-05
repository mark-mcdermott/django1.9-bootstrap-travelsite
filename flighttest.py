from datetime import datetime
from datetime import date
from datetime import time
from time import gmtime, strftime
from pytz import timezone
import random

template = "- model: proto.flight\n"\
    "  pk: %d\n"\
    "  fields: \n"\
    "  flight_number: %d\n"\
    "  airline_name: %d\n"\
    "  source_city: %d\n"\
    "  destination_city: %d\n"\
    "  departure_time: %s\n"\
    "  arrival_time: %s\n"\
    "  miles: %d\n"\
    "  international: %r\n"
print("After internationaldeclaration")
def out_fun():
    f = open('output_flights.yaml','a+')
    f.write(output)                                       
pk=69
fields=''
flight_number=6000
source_city=1
airline_name=1
destination_city=2
fmt = "%H:%M:%S"
miles=1008
arrival_daytime = datetime.now(timezone('UTC'))
international=False
print("After international")
#Converting UTC to Pacific for Destination to show change in time ---- START
now_utc = datetime.now(timezone('UTC'))
destination_daytime = now_utc.astimezone(timezone('US/Pacific'))
#Converting UTC to Pacific for Destination to show change in time ---- END
for i in range(1,11):
    international=False
    source_city = i
    for j in range(1,11): # destination city loop
        destination_city=j
        for airline_name in range(1,7):
            if source_city!= destination_city:
               miles=random.randrange(1000,9999)
               flight_number=flight_number+1
               pk=pk+1
               if destination_city>4 or source_city >4:
                  international=True
               output = (template % (int(pk),flight_number, airline_name,source_city,destination_city,destination_daytime.strftime(fmt),arrival_daytime.strftime(fmt),miles,international))
               out_fun()
               
