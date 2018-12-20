import os
import json
from twilio.rest import Client

account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

notification = client.notify \
    .services('IS3a46cc3e6ca7a1b8bd7aea51c875d33a') \
    .notifications \
    .create(
            body='py 1.2',
            to_binding=json.dumps({
                              'binding_type': 'sms',
                              'address': '+16508668232'
            })
            )
# {"binding_type": "sms", "address": "+16508668232"}
# {'binding_type': 'sms', "address": "+1651000000000"}
print(notification.sid)