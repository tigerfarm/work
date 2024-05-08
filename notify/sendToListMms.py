print("+++ Send Notify MMS.")
import os
import json
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
notify_service_sid = os.environ.get("MASTER_NOTIFY_SERVICE_SID")
phoneNumber1 = os.environ.get("MY_PHONE_NUMBER")
print("+ Using notification service, SID: " + notify_service_sid)
print("+ Send notifications to: " + phoneNumber1)
notification = client.notify.services(notify_service_sid).notifications.create(
    body='Hello to you two 3',
    sms={ 'media_urls':['https://demo.twilio.com/owl.png']},
    to_binding=[
        json.dumps({"binding_type":"sms", "address": phoneNumber1})
    ]
  )
print("+ Notification SID: " + notification.sid)
print("+++ Exit.")
# ------------------------------------------------------------------------------
