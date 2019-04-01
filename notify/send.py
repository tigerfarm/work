print("+++ Send using Notify.")
import json
from twilio.rest import Client
account_sid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
auth_token = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
client = Client(account_sid, auth_token)
notifyServiceSid = "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
notification = client.notify.services(notifyServiceSid).notifications.create(
    body="Hello to one recipient.",
    to_binding= [
        json.dumps( {"binding_type":"sms", "address": "+12223331234"} )
    ]
)
print("+ Notification SID: " + notification.sid)
print("+++ Exit.")