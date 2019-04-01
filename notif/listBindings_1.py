print("+++ List Bindings (SID, tag, identity, type, address:phone number).")
import os
from twilio.rest import Client
# from datetime import date
# Documentation: https://www.twilio.com/docs/notify/api/bindings
# ------------------------------------------------------------------------------
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")
bindings = client.notify.services(notifyServiceSid).bindings \
    .list(tag='all')
    # .list(start_date=date(2015, 8, 25), tag="all", identity='+16508668882')
for binding in bindings:
    # First, create a tag list for printing.
    theTags = ""
    theTrailer = ","
    i = 0;
    for tags in binding.tags:
        if i == len(binding.tags)-1:
            theTrailer = ""
        theTags += binding.tags[i] + theTrailer
        i += 1
    print("+ " + binding.sid + " [" + theTags + "] " + binding.identity + " " + binding.binding_type + " " + binding.address)
# ------------------------------------------------------------------------------
print("+ End of list.")