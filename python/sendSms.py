print("+++ Start.")
#
import json
import os
account_sid = os.environ.get("MAIN_ACCOUNT_SID")
auth_token = os.environ.get("MAIN_AUTH_TOKEN")
print("+ account_sid ", account_sid, " auth_token ", auth_token)
# PhoneNumber1 = os.environ.get("MAIN_PN_7002")
# PhoneNumber2 = os.environ.get("MY_PHONE_NUMBER")
PhoneNumber1 = "whatsapp:" + os.environ.get("MAIN_PN_7002")
PhoneNumber2 = "whatsapp:" + os.environ.get("MY_PHONE_NUMBER")
theMsg = "Hello there 2"
print("+ Send from ", PhoneNumber1, " to ", PhoneNumber2, " the msg: ", theMsg)
#
from twilio.rest import Client
client = Client(account_sid, auth_token)
message = client.messages.create(
        # from_=PhoneNumber1,
        messaging_service_sid="MGf0df9883c5d0720e89ad6c14e2a76f9f",
        to=PhoneNumber2,
        body=theMsg,
        # The following probably doesn't work because I have an old Twilio helper library. 
        # content_sid="HX9eddf30c9a69ac1cbe024155d218b4ff",
        # content_variables=json.dumps({"1": "Name"}),
        );
print("+ Message sid: ", message.sid)
print("+++ Exit.")
