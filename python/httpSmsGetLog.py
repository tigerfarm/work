print "+++ Start."

import os
ACCOUNT_SID = os.environ.get("ACCOUNT_SID")
AUTH_TOKEN = os.environ.get("AUTH_TOKEN")

import requests
aSession = requests.Session()

theMessageSid = 'SM6dc8d62a87ac4c67a7796a4364832e54'
theRequest = 'https://' + ACCOUNT_SID + ':' + AUTH_TOKEN + '@api.twilio.com/2010-04-01/Accounts/' + ACCOUNT_SID + '/Messages/' + theMessageSid + '.json'
response = aSession.get(theRequest)
print "+ Response: ", response.text

print "+++ Exit."
