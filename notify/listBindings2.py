print("+++ List Bindings (SID, identity, type, address:phone number).")
import os
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")
bindings = client.notify.services(notifyServiceSid).bindings \
    .list(tag='all')
for binding in bindings:
    print("+ " + binding.sid + " " + binding.identity + " " + binding.binding_type + " " + binding.address)
print("+ End of list.")