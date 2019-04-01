print("+++ Send using Notify.")
import os
import json
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")
notification = client.notify.services(notifyServiceSid).notifications.create(
    body="Hello to one recipient.",
    to_binding= [
        json.dumps( {"binding_type":"sms", "address": "+12223331234"} )
    ]
)
print("+ Notification SID: " + notification.sid)
print("+++ Exit.")