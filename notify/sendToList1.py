# Documentation: https://www.twilio.com/notify/api
# Documentation: https://www.twilio.com/docs/notify/api/notifications
# ------------------------------------------------------------------------------
print("+++ Send notifications.")
import os
import json
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
#
phoneNumber1 = os.environ.get("PHONE_NUMBER1")
#
print("+ Send notifications to: " + yourPhoneNumber)
print("+ Using notification service, SID: " + os.environ.get("NOTIFY_SERVICE_SID"))
notify_service_sid = os.environ.get("NOTIFY_SERVICE_SID")
notification = client.notify.services(notify_service_sid).notifications.create(
    body='Hello to you two.',
    to_binding=[
        json.dumps({"binding_type":"sms", "address": phoneNumber1}),
        json.dumps({"binding_type":"sms", "address": os.environ.get("PHONE_NUMBER4")})
    ]
  )
print("+ Notification SID: " + notification.sid)
print("+++ Exit.")
# ------------------------------------------------------------------------------
