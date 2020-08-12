print "+++ Start."
import os
account_sid = os.environ.get("MASTER_ACCOUNT_SID")
auth_token = os.environ.get("MASTER_AUTH_TOKEN")
from twilio.rest import Client
client = Client(account_sid, auth_token)
PhoneNumber1 = os.environ.get("MASTER_PHONE_NUMBER_2")
PhoneNumber2 = os.environ.get("MASTER_PHONE_NUMBER_1")
theMsg = "Hello there"
print "+ Send from ", PhoneNumber1, " to ", PhoneNumber2, " the msg: ", theMsg
try:
    message = client.messages.create(
                body=theMsg,
                from_=PhoneNumber1,
                to=PhoneNumber2
                );
    print "+ Message sid: ", message.sid
except TwilioRestException as e:
    print "- Error code: ", e.code, ", message: ", e.msg
print "+++ Exit."
