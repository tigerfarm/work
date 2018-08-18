from twilio.twiml.voice_response import VoiceResponse, Dial
response = VoiceResponse() 
dial = Dial() 
dial.conference('UbiquityTest01') 
print "+ Conference call TwiML: "
print(response.append(dial))
response.append(dial)
# ------------------------------------------------------------------------------
print ""

