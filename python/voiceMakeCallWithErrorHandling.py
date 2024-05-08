import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
print " +++ Start."
print
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
try:
    call = client.calls.create(
        from_=os.environ.get("PHONE_NUMBER3"), # A valid Twilio number
        to="123",
        url="https://example.com/testing")
    print "+ Call (from, to, SID):", call.from_, ",", call.to, ",", call.sid
    print
except TwilioRestException as e:
            print "- Error code: ", e.code, ", message: ", e.msg
            
print " +++ exit."
