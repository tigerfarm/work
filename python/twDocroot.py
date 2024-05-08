# Docroot response: http://<hostname>

from twilio.twiml.voice_response import VoiceResponse

# ------------------------------------------------------------------------------
response = VoiceResponse()
response.say("Welcome to Twilio")

print response;
# <?xml version="1.0" encoding="UTF-8"?>
# <Response>
# <Say>Welcome to Twilio</Say>
# </Response>

# ------------------------------------------------------------------------------
# eof
