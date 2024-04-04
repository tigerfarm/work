print "+++ Start."
import os
account_sid = os.environ.get('ACCOUNT_SID')
auth_token = os.environ.get('AUTH_TOKEN')
print "+ account_sid :" + account_sid + ": auth_token :" + auth_token + ":"
#
account_sid2 = os.environ['ACCOUNT_SID']
auth_token2 = os.environ['AUTH_TOKEN']
print "+ account_sid2 :" + account_sid2 + ": auth_token2 :" + auth_token2 + ":"
print "+++ Exit."
