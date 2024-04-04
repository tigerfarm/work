# import csv
import os
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
# with open('Testmunchies.csv') as csvfile:
    # spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    # for row in spamreader:
        # attendee = row[0].split()[0]
        # attendee_number = "+1", row[1]
attendee = 'David'
attendee_number = os.environ.get("PHONE_NUMBER2")
print(attendee)
print(attendee_number)
message = client.messages.create(
            to=str(attendee_number), 
            from_=os.environ.get("PHONE_NUMBER3"),
            body="Hey %s! It's Friday, and we are just 9 days away from Munchies! This is the last week before Prices go up!! \nDon't forget to bring Coats, Hats, Gloves, or Socks for a chance to win a special prize!!  \nHaven't got your tickets yet? Don't worry, Use the following link below to grab your tickets! \nhttps://eventnoire.com/munchies-mimosas-ugly-sweater/ \nIf you no longer wish to receive these messages, reply STOP to unsubscribe" % (attendee))
print(message.sid)