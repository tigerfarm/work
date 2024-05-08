print "+++ Echo environment variables."
import os
# ------------------------------------------------------------------------------
# Get your account SID and auth token from https://twilio.com/console.
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
print "+ ACCOUNT_SID =", account_sid
print "+ AUTH_TOKEN =", auth_token
#
accountPhoneNumber = os.environ.get("ACCOUNT_PHONE_NUMBER")
print "+ ACCOUNT_PHONE_NUMBER =", accountPhoneNumber
notifyServiceSid = os.environ.get("NOTIFY_SERVICE_SID")
print "+ NOTIFY_SERVICE_SID =", notifyServiceSid
print "+ The following are required when creating bindings:"
print "+ PHONE_NUMBER_1 =", os.environ.get("PHONE_NUMBER1")
print "+ PHONE_NUMBER_2 =", os.environ.get("PHONE_NUMBER2")
print "+ PHONE_NUMBER_3 =", os.environ.get("PHONE_NUMBER3")
print "+ PHONE_NUMBER_4 =", os.environ.get("PHONE_NUMBER4")
print ""
print "++ Test Twilio helper library."
from twilio.rest import Client
client = Client(account_sid, auth_token)
from datetime import date
bindings = client.notify.services(notifyServiceSid).bindings.list(start_date=date(2015, 8, 25))
print "+ Helper library works."
# ------------------------------------------------------------------------------
print ""
print "+++ Exit."

