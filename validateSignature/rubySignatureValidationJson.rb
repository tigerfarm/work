puts "+++ Start."
require 'twilio-ruby'
auth_token = ENV["MASTER_AUTH_TOKEN"]
validator = Twilio::Security::RequestValidator.new(auth_token)
url = 'http://example.com/studio?bodySHA256=12345fd62d0edbf5034ee40ec14c210d230f87642535e25461e123465c545057'
params = {}
# The X-Twilio-Signature header attached to the request
twilio_signature = 'p9asdljeafoijawljfeiaelfjsa='
#
puts validator.validate(url, params, twilio_signature)
#
puts "+++ Exit."