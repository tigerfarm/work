print("+++ Delete Bindings (SID, tag, identity, type, address:phone number).")
import os
from twilio.rest import Client
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")
bindings = client.notify.services(notifyServiceSid).bindings \
    .list(tag='all')
for binding in bindings:
    client.notify.services(notifyServiceSid).bindings(binding.sid).delete()
    print("+ Deleted: " + binding.sid  + " " + binding.identity + " " + binding.binding_type + " " + binding.address)
print("+ End of list.")