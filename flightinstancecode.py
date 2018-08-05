import datetime

template = "- model: proto.flightinstance\n"\
           "  pk: %d\n"\
           "  fields:\n"\
           "  flight_no: %d\n"\
           "  date: %s\n"\
           "  status:'IF','FF'\n"
def out_fun():
    f = open('outputflightinstance.py','a+')
    #print(template % (int(pk),name,city,number_of_rooms))
    f.write(output)
pk = 6280
today = datetime.datetime(2018,8,3)
delta = datetime.timedelta(days=1)


for flight_no in range(1,70):
    day = today
    for date in range(31):
        day += delta
        #print(template % (pk, flight_no, day.strftime('%Y-%m-%d')))
        pk += 1
        output = (template % (pk, flight_no, day.strftime('%Y-%m-%d')))
        out_fun()
