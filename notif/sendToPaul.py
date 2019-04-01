print("+++ Send to an identity.")
import os
from twilio.rest import Client

# Documentation: https://www.twilio.com/notify/api
# Documentation: https://www.twilio.com/docs/notify/api/notifications
# ------------------------------------------------------------------------------

account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

theIdentity = "paul";
print("+ Send notifications to identity: " + theIdentity)
notify_service_sid = os.environ.get("NOTIFY_SERVICE_SID")
notification = client.notify.services(notify_service_sid).notifications.create(
    body='Hello Paul',
    identity=theIdentity
  )
print("+ Notification SID: " + notification.sid)

# ------------------------------------------------------------------------------
print("+++ Exit.")
