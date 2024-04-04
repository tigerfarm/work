# Generate a Twilio Client Token
#
# Documentation link: https://www.twilio.com/docs/api/client/capability-tokens
#
import os
#
# ------------------------------------------------------------------------------
account_sid = os.environ.get("ACCOUNT_SID");
auth_token = os.environ.get("AUTH_TOKEN");

clientId = 'StacyDavid'

# https://www.twilio.com/console/voice/runtime/twiml-apps/AP3e39d97697a2506b61e766d0a46c7e85
APP_SID = 'AP3e39d97697a2506b61e766d0a46c7e85'

# ------------------------------------------------------------------------------
from twilio.jwt.client import ClientCapabilityToken
capability = ClientCapabilityToken(account_sid, auth_token)  # agent Twilio Client capability token
capability.allow_client_incoming( clientId )
client_token = capability.to_jwt()
print "+ Client token: " + client_token;

# SDK: from twilio.util import TwilioCapability
# SDK: capability = TwilioCapability(account_sid, auth_token)
# SDK: # This allows outgoing connections to TwiML application
# SDK: if request.values.get('allowOutgoing') != 'false':
# SDK:         capability.allow_client_outgoing(app_sid)
# SDK: # This allows incoming connections to client (if specified)
# SDK: client = request.values.get('client')
# SDK: if client != None:
# SDK:         capability.allow_client_incoming(client)
        
# ------------------------------------------------------------------------------
# eof
