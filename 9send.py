print("+++ Send using Notify.")
import os
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")
print "+ NOTIFY_SERVICE_SID =", notifyServiceSid
client = Client(account_sid, auth_token)
notification = client.notify.services(notify_service_sid).notifications.create(
    body="Hello others.",
    tag= "other"
)
print("+ Notification SID: " + notification.sid)
print("+++ Exit.")