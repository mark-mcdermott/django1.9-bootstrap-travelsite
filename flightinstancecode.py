import datetime
import random

template = "- model: proto.flightinstance\n"\
           "  pk: %d\n"\
           "  fields:\n"\
           "  flight_no: %d\n"\
           "  date: %s\n"\
           "  status: %s\n"
def out_fun():
    f = open('output_flightinstance.yaml','a+')
    #print(template % (int(pk),name,city,number_of_rooms))
    f.write(output)
pk = 6280
today = datetime.datetime(2018,8,3)
delta = datetime.timedelta(days=1)
markedday=datetime.datetime(2018,8,8)#added a variable for 8th aug
status =  'IF'
status_list=["AR","IF","DL"]
for flight_no in range(1,609):
    day = today
    for date in range(30):
        day += delta
        #print(day.strftime('%Y-%m-%d'))
        pk += 1
        if  day<markedday:
            status="AR"
        elif day>datetime.datetime(2018,8,9):
             status="FF"
        else:
            status=random.choice(status_list)
        print(status,day)
        output = (template % (pk, flight_no, day.strftime('%Y-%m-%d'),status))
        out_fun()
