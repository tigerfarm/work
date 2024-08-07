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

PhoneNumber1 = os.environ.get("PHONE_NUMBER_2")
PhoneNumber2 = os.environ.get("PHONE_NUMBER_3")
#
print "+ Send notifications to: ", PhoneNumber1, " and ", PhoneNumber2
notify_service_sid = os.environ.get("NOTIFY_SERVICE_SID")
notification = client.notify.services(notify_service_sid).notifications.create(
    body='Hello to two phone numbers.',
    to_binding=[
        "{\"binding_type\":\"sms\",\"address\":\"", PhoneNumber1, "\"}",
        "{\"binding_type\":\"sms\",\"address\":\"", PhoneNumber2, "\"}"
    ]
  )

print "+ Notification SID: ", notification.sid

# ------------------------------------------------------------------------------
print("+++ Exit.")
