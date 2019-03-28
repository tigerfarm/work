print "+++ Start."
import os
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
from twilio.rest import Client
client = Client(account_sid, auth_token)
PhoneNumber1 = os.environ.get("PHONE_NUMBER_2")
PhoneNumber2 = os.environ.get("PHONE_NUMBER_3")
theMsg = "Hello there"
print "+ Send from ", PhoneNumber1, " to ", PhoneNumber2, " the msg: ", theMsg
message = client.messages.create(
        body=theMsg,
        from_=PhoneNumber1,
        to=PhoneNumber2
        );
print "+ Message sid: ", message.sid
print "+++ Exit."
