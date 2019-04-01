print "+++ List Services."
import os
from twilio.rest import Client

# Documentation: https://www.twilio.com/docs/notify/api/services
# ------------------------------------------------------------------------------

account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

services = client.notify.services.list()
for service in services:
    print("+ " + service.sid + " " + service.friendly_name)

# ------------------------------------------------------------------------------
print("+ End of list.")
