import random
import datetime
import sys
template = "- model: proto.creditcard\n"\
           "  pk:%d\n"\
           "  fields: \n"\
           "  type: %s\n"\
           "  cardnumber: %d\n"\
           "  name: %s\n"\
           "  expiration: %s\n"\
           "  billing_address: %s\n"
def out_fun():
    f = open('output_creditcard.yaml','a+')
    #print(template % (int(pk),name,city,number_of_rooms))
    f.write(output)
pk=1
expiration = datetime.datetime(2020,8,3)
today=datetime.datetime(2020,8,3)
delta = datetime.timedelta(days=6)
type='MC'
name='sirisha'
type_option=["MC","AE","VS"]
name_option=["sirisha","Harika","Andrew","Mark","Sandeep","Scott","John","Ann","Sai","Jon","Jonah"]
street=["University Blvd","Research Blvd","Parmer Lane","Mopac","Capital Highway","Spectrum Dr","Dreams Dr","Hope Dr","E Whitestone Blvd","FM 620 Highland Horizon","RM 1431 stoneOaks"]
billing_address='1234 texas state university , university Blvd, tx 78717'
for number in range(0,30):
    name=random.choice(name_option)
    #billing_address
    cardnumber = random.randint(1000000000000000,9999999999999999)
    type=random.choice(type_option)
    day = today
    billing_address=str(random.randint(1000,9999))+" "+random.choice(street)+" "+ str(random.randint(10000,99999))
    for date in range(5):
        day += delta
    #print(template % (int(pk),type, cardnumber,name,expiration.strftime('%Y-%m-%d'),billing_address))
    pk=pk+1
    output = (template % (int(pk),type, cardnumber,name,expiration.strftime('%Y-%m-%d'),billing_address))
    out_fun()



