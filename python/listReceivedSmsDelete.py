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
    print "+ Argument:", parDate; # Example: 2017-02-26
    messages = client.messages.list(date_sent=date(int(parDate[:4]), int(parDate[:7][5:]), int(parDate[:10][8:])));
else:
    print "+ Date required, example:"
    print "$ python listReceivedSmsDelete.py 2017-07-17"
    print
    exit()
#
print "++ List received messages:"
for message in messages:
    client.messages(message.sid).delete();
    print "+ Deleted: " + message.date_sent.strftime('%Y-%m-%d %H:%M:%S') + " " + message.to + " " + message.from_ + " : " + message.body + " : " + message.sid
print "+ End of list."

print "+++ Completed."