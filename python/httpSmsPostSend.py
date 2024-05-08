print "+++ Start."

import os
ACCOUNT_SID = os.environ.get("ACCOUNT_SID")
AUTH_TOKEN = os.environ.get("AUTH_TOKEN")

import requests
aSession = requests.Session()

theParameters = {'From': os.environ.get("PHONE_NUMBER3"),'To': os.environ.get("PHONE_NUMBER4"),'Body':'Twilio support #1'}
theRequest = 'https://' + ACCOUNT_SID + ':' + AUTH_TOKEN + '@api.twilio.com/2010-04-01/Accounts/' + ACCOUNT_SID + '/Messages.json'
response = aSession.post(theRequest, data=theParameters)
print "+ Response: ", response.text

print "+++ Exit."
