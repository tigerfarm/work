#!/usr/bin/env python3
from twilio.request_validator import RequestValidator
import requests, os

print("+++ Start.")

auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
validator = RequestValidator(auth_token)

url = 'http://example.com/studio?bodySHA256=12345fd62d0edbf5034ee40ec14c210d230f87642535e25461e123465c545057'
params = {
 'f1': 'FNd5d6ba6b7f62e691024040a8c27dab89'
}
# The X-Twilio-Signature header attached to the request
twilio_signature = 'p9asdljeafoijawljfeiaelfjsa='
#
print(validator.validate(url, params, twilio_signature))
#
print("+++ Exit.")
