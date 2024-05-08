# Generate a Twilio Voice Token
#
# Documentation link: https://www.twilio.com/docs/api/rest/access-tokens
#
import os
#
from twilio.jwt.access_token import AccessToken
# Error in original: from twilio.jwt.access_token import VoiceGrant
from twilio.jwt.access_token.grants import VoiceGrant

# ------------------------------------------------------------------------------
# Values are from my owlvc subaccount.
account_sid = os.environ.get("ACCOUNT_SID");
app_sid = 'AP02ed10e60d10ff199d90d3a0258a85f4';
push_credential_sid = 'CR0ceca8bdabaa74fada883b5e92ca361c';
#
# IDENTITY is event.From in my Twilio Function.
IDENTITY = 'stacydavid'
api_key = os.environ.get("CHAT_API_KEY");
api_key_secret = os.environ.get("CHAT_API_KEY_SECRET");

# ------------------------------------------------------------------------------
grant = VoiceGrant(
    push_credential_sid=push_credential_sid,
    outgoing_application_sid=app_sid
)
token = AccessToken(account_sid, api_key, api_key_secret, identity=IDENTITY)
token.add_grant(grant)

print str(token)
        
# ------------------------------------------------------------------------------
# eof
