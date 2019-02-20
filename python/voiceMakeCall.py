#
# Doc: https://www.twilio.com/docs/quickstart/python/rest/call-request#call-end-callback
#
import os
from twilio.rest import Client
print " +++ Start."
print
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
call = client.calls.create(
    from_=os.environ.get("PHONE_NUMBER_3"), # A valid Twilio number
    to=os.environ.get("PHONE_NUMBER_2"),    # If using a trial account, this is a verified phone number
    method="GET",
    # url="http://twiliobuckettest.s3.amazonaws.com/3d1807b0-a5dc-4f9e-98a0-48b5154923cb.mp3")
    url="http://tigerfarmpress.com/tech/docs/sound/3choices.xml")
    # url="https://obedient-machine-3163.twil.io/assets/voice.xml")
    
# Note, the 3choices.xml file is a list of online MP3 files to be played.
print "+ Call (from, to, SID):", call.from_, ",", call.to, ",", call.sid
print
print " +++ exit."
