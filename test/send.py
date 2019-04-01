print("+++ Send using Notify.")
import json
import os
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
# Replace with your Notification service SID:
notify_service_sid = "IS8f2eb381a43ae45d4d89f0a1ec81a71c"
client = Client(account_sid, auth_token)
notification = client.notify.services(notify_service_sid).notifications.create(
    body="Hello others.",
    tag= "other"
)
print("+ Notification SID: " + notification.sid)
print("+++ Exit.")