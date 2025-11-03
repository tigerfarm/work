title="++ List SMS messages."
import os
import sys
from datetime import date
from twilio.rest import Client
#
account_sid = os.environ.get("MAIN_ACCOUNT_SID")
auth_token = os.environ.get("MAIN_AUTH_TOKEN")
client = Client(account_sid, auth_token)
#
# MAIN_PN_7002 MAIN_PN_8003
receiving_phone_number = os.environ.get("MAIN_PN_8003")
sending_phone_number = os.environ.get("MAIN_PN_7002")
print("+ receiving_phone_number = " + receiving_phone_number)
print("+ sending_phone_number   = " + sending_phone_number)
#
messages = client.messages.list(
from_=sending_phone_number,
to=receiving_phone_number,
limit=1,
)
#
print( title, "Message list (Date Time From To : Text):")
print("+ " + messages[0].from_ + " " + messages[0].to + " : " + messages[0].body)
# for message in messages:
#    print("+ " + message.from_ + " " + message.to + " : " + message.body)
print("+ End of list.")
