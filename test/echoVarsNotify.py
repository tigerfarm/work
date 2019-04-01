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
phoneNumber1 = os.environ.get("PHONE_NUMBER_1")
phoneNumber2 = os.environ.get("PHONE_NUMBER_2")
phoneNumber3 = os.environ.get("PHONE_NUMBER_3")
print "+ PHONE_NUMBER_1 =", phoneNumber1
print "+ PHONE_NUMBER_2 =", phoneNumber2
print "+ PHONE_NUMBER_3 =", phoneNumber3
print ""
print "++ Test Twilio helper library."
from twilio.rest import Client
client = Client(account_sid, auth_token)
# bindings = client.notify.services(notifyServiceSid).bindings.list(tag="test")
print "+ Helper library works."
# ------------------------------------------------------------------------------
print ""
print "+++ Exit."
