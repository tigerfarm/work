# Documentation: https://www.twilio.com/notify/api
# Documentation: https://www.twilio.com/docs/notify/api/notifications
# ------------------------------------------------------------------------------
print("+++ Send notifications.")
import os
import sys
import json
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
#
# Note, first argument is the program name.
print "+ NUmber of arguments = ", len(sys.argv)
if len(sys.argv) < 3:
    print "+ Requires arguments: to-phone-number message"
    exit()
if len(sys.argv) > 1:
    print "+ 2nd argument:", sys.argv[1]
if len(sys.argv) > 2:
    print "+ 3rd argument:", sys.argv[2]
print
phoneNumber1 = sys.argv[1]
theMessage = sys.argv[2]
print("+ Send notifications to: " + phoneNumber1)
print("+ Using notification service, SID: " + os.environ.get("NOTIFY_SERVICE_SID"))
notify_service_sid = os.environ.get("NOTIFY_SERVICE_SID")
notification = client.notify.services(notify_service_sid).notifications.create(
    body=theMessage,
    to_binding=[
        json.dumps({"binding_type":"sms", "address": phoneNumber1})
    ]
  )
print("+ Notification SID: " + notification.sid)
print("+++ Exit.")
# ------------------------------------------------------------------------------
