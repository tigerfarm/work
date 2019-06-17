print "+++ Start."

import os
import requests
from requests.auth import HTTPBasicAuth
ACCOUNT_SID = os.environ.get("ACCOUNT_SID")
theAuth=HTTPBasicAuth(ACCOUNT_SID, os.environ.get("AUTH_TOKEN"))
aSession = requests.Session()

theMessageSid = 'SM2ba18ece386761fff68c6c748106997e'
theRequest = 'https://api.twilio.com/2010-04-01/Accounts/' + ACCOUNT_SID + '/Messages/' + theMessageSid + '.json'
response = aSession.get(theRequest, auth=theAuth)
print "+ Response: ", response.text

print "+++ Exit."
