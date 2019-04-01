print("+++ Create Bindings.")
import os
from twilio.rest import Client
from datetime import date
# Documentation: https://www.twilio.com/docs/notify/api/bindings
# ------------------------------------------------------------------------------

account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")
phoneNumber1 = os.environ.get("PHONE_NUMBER_1")
phoneNumber2 = os.environ.get("PHONE_NUMBER_2")
phoneNumber3 = os.environ.get("PHONE_NUMBER_3")

binding = client.notify.services(notifyServiceSid).bindings \
            .create(
                identity="peter",
                tag="one",
                binding_type="sms",
                address=phoneNumber1
            )
print("+ Created: " + binding.identity)

binding = client.notify.services(notifyServiceSid).bindings \
            .create(
                identity="paul",
                tag="other",
                binding_type="sms",
                address=phoneNumber2
            )
print("+ Created: " + binding.identity)

binding = client.notify.services(notifyServiceSid).bindings \
            .create(
                identity="mary",
                tag="other",
                binding_type="sms",
                address=phoneNumber3
            )
print("+ Created: " + binding.identity)

print("+++ List Bindings (SID, tag, identity, type, address:phone number).")
bindings = client.notify.services(notifyServiceSid).bindings \
    .list(start_date=date(2015, 8, 25))
for binding in bindings:
    print("+ " + binding.sid + " " + binding.tags[0] + " " + binding.identity + " " + binding.binding_type + " " + binding.address)

# ------------------------------------------------------------------------------
print("+ End of list.")