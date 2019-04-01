print("+++ Send notifications.")
import os
import json
from twilio.rest import Client

# Documentation: https://www.twilio.com/notify/api
# Documentation: https://www.twilio.com/docs/notify/api/notifications
# ------------------------------------------------------------------------------

account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

phoneNumber1 = os.environ.get("PHONE_NUMBER_1")
phoneNumber2 = os.environ.get("PHONE_NUMBER_2")
print("+ Send notifications to: " + phoneNumber1 + " and " + phoneNumber2 )
notify_service_sid = os.environ.get("NOTIFY_SERVICE_SID")
notification = client.notify.services(notify_service_sid).notifications.create(
    body='Hello to the list of 2.',
    to_binding=[
      json.dumps({"binding_type":"sms", "address": phoneNumber1}),
      json.dumps({"binding_type":"sms", "address": phoneNumber2})
    ]
  )
print("+ Notification SID: " + notification.sid)

# ------------------------------------------------------------------------------
print("+++ Exit.")
