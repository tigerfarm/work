title="++ List and delete received SMS messages."
import os
import sys
from datetime import date
from twilio.rest import Client
#
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)
#
if len(sys.argv) > 1:
    parDate = sys.argv[1];
    title = title + " for the date: " + parDate; # Example: 2018-06-13
    messages = client.messages.list(date_sent=date(int(parDate[:4]), int(parDate[:7][5:]), int(parDate[:10][8:])));
else:
    messages = client.messages.list();
#
print( title, " (Date Time From To : Text):")
for message in messages:
    if message.status == "received":
        print("+ " + message.date_sent.strftime('%Y-%m-%d %H:%M:%S') + " " + message.from_ + " " + message.to + " : " + message.body)
        # Other data values: message.sid message.status
        client.messages(message.sid).delete()
print("+ End of list.")
