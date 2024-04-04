print "+++ Start."

import os
import requests
from requests.auth import HTTPBasicAuth
ACCOUNT_SID = os.environ.get("ACCOUNT_SID")
theAuth=HTTPBasicAuth(ACCOUNT_SID, os.environ.get("AUTH_TOKEN"))
aSession = requests.Session()

theParameters = {'From': os.environ.get("PHONE_NUMBER3"),'To': os.environ.get("PHONE_NUMBER4"),'Body':'Twilio support #2'}
theRequest = 'https://api.twilio.com/2010-04-01/Accounts/' + ACCOUNT_SID + '/Messages.json'
response = aSession.post(theRequest, data=theParameters, auth=theAuth)
print "+ Response: ", response.text

print "+++ Exit."
