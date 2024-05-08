print("+++ Delete list of Bindings.")
import os
from twilio.rest import Client
from datetime import date
# Documentation: https://www.twilio.com/docs/notify/api/bindings
# ------------------------------------------------------------------------------

account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")

bindings = client.notify.services(notifyServiceSid).bindings \
    .list(start_date=date(2015, 8, 25))

for binding in bindings:
    client.notify.services(notifyServiceSid).bindings(binding.sid).delete()
    print("+ Deleted: " + binding.sid + " " + binding.tags[0] + " " + binding.identity + " " + binding.binding_type + " " + binding.address)

# ------------------------------------------------------------------------------
print("+ End of list.")
