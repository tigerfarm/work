print("+++ Send an SMS message.")
import os
from twilio.rest import Client

# Documentation: https://www.twilio.com/docs/sms/send-messages
# ------------------------------------------------------------------------------

account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)

accountPhoneNumber = os.environ.get("ACCOUNT_PHONE_NUMBER")
yourPhoneNumber = os.environ.get("YOUR_PHONE_NUMBER")
#
print("+ Send message from:", accountPhoneNumber, "to:", yourPhoneNumber)
theMsg = "Hello there"
print("+ The message:" + theMsg)
message = client.messages.create(
        body=theMsg,
        from_=accountPhoneNumber,
        to=yourPhoneNumber
        );
print("+ Message sid: " + message.sid)

# ------------------------------------------------------------------------------
print("+ End of list.")
