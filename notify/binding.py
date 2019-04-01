print("+++ Create Bindings.")
from twilio.rest import Client
from datetime import date
account_sid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
auth_token = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
notify_service_sid = "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
client = Client(account_sid, auth_token)
binding = client.notify.services(notify_service_sid).bindings \
            .create(
                identity="peter",
                tag=["support"],
                binding_type="sms",
                address="+12223331234"
            )
print("+ Created: " + binding.identity)
#
print("+++ List Bindings (SID, tag, identity, type, address:phone number).")
bindings = client.notify.services(notify_service_sid).bindings \
    .list(start_date=date(2015, 8, 25))
for binding in bindings:
    theTags = ""
    theTrailer = ","
    i = 0;
    for tags in binding.tags:
        if i == len(binding.tags)-1:
            theTrailer = ""
        theTags += binding.tags[i] + theTrailer
        i += 1
    print("+ " + binding.sid + " [" + theTags + "] " + binding.identity + " " + binding.binding_type + " " + binding.address)
#
print("+ End of list.")
