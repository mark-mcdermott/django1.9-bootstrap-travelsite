import random
import sys
template = "- model: proto.hotel\n"\
           "  pk:%d\n"\
           "  fields: \n"\
           "  name: %s\n"\
           "  number_of_rooms: %d\n"\
	   "  city: %s\n"
def out_fun():
        f = open('output_hotels.yaml','a+')
        #print(template % (int(pk),name,city,number_of_rooms))
        f.write(output)
        
pk=1
number=0
city=1
city=list(range(1,11))
name_option= ["omni","The park","Faluknuma Palace","Taj,Sheraton","Motel 6","Quality Inn","Wyadham","Four Seasons","Hyatt","Driskill Hotel","The Liberty","The Drake Hotel","W Mexico City"]
for number in range(0,12):
    name=random.choice(name_option)
    number_of_rooms=number+100
    pk=pk+1
    #print(template % (int(pk),name,number_of_rooms, city))
    output = (template % (int(pk),name,number_of_rooms,city))
    out_fun()
    #print("output file is working")
  
    

