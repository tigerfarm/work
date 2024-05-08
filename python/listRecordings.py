title="++ List and delete received SMS messages."
import os
from datetime import date
from twilio.rest import Client
#
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

# List all
# recordings = client.recordings.list(limit=20)
# for record in recordings:
#    print("+ " + record.sid + " " + record.date_created.strftime('%Y-%m-%d %H:%M:%S'))

# Example: 2019-10-24
recordings = client.recordings.list(date_created=date(int(2019),int(10),int(24)))
for record in recordings:
    print("+ " + record.sid + " " + record.date_created.strftime('%Y-%m-%d %H:%M:%S'))

print("+ End of list.")
