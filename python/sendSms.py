print "+++ Start."
#
import os
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
print "+ account_sid ", account_sid, " auth_token ", auth_token
PhoneNumber1 = os.environ.get("MASTER_PHONE_NUMBER_2")
PhoneNumber2 = os.environ.get("MASTER_PHONE_NUMBER_1")
theMsg = "Hello there"
print "+ Send from ", PhoneNumber1, " to ", PhoneNumber2, " the msg: ", theMsg
#
from twilio.rest import Client
client = Client(account_sid, auth_token)
message = client.messages.create(
        body=theMsg,
        from_=PhoneNumber1,
        to=PhoneNumber2
        );
print "+ Message sid: ", message.sid
print "+++ Exit."
