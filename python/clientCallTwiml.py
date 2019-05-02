# Transfer.
#
# Documentation link: https://www.twilio.com/docs/api/taskrouter/worker-js
#
# This method routes calls from/to client                  """
# Rules: 1. From can be either client:name or PSTN number  """
#        2. To value specifies target. When call is coming """
#           from PSTN, To value is ignored and call is     """
#           routed to client named CLIENT"""
import os
#
from twilio.twiml.voice_response import VoiceResponse

# ------------------------------------------------------------------------------
response = VoiceResponse()
response.say("Welcome to Twilio")

# From can be either client:name or PSTN number
from_value = "11231231234"
# To value specifies target.
## When call is coming from PSTN, To value is ignored
## When call is routed to client named CLIENT.
to = "+12223331234"

if not (from_value and to):
    response.say("Invalid request")
    print response
    return

caller_id = os.environ.get("HONE_NUMBER1") # Twilio phone number

from_client = from_value.startswith('client')
if not from_client:
    # PSTN -> client
    response.dial(callerId=from_value).client(CLIENT)
elif to.startswith("client:"):
    # client -> client
    response.dial(callerId=from_value).client(to[7:])
else:
    # client -> PSTN
    response.dial(to, callerId=caller_id)

print response;
# <?xml version="1.0" encoding="UTF-8"?>
# <Response>
# <Say>Welcome to Twilio</Say>
# </Response>

# ------------------------------------------------------------------------------
# eof
