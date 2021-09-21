puts "+++ Start."
require 'twilio-ruby'
auth_token = ENV["MASTER_AUTH_TOKEN"]
validator = Twilio::Security::RequestValidator.new(auth_token)
url = 'http://tfpecho.herokuapp.com/studio'
params = {
 'f1' => 'FNd5d6ba6b7f62e691024040a8c27dab89'
}
# The X-Twilio-Signature header attached to the request
twilio_signature = 'p9asdljeafoijawljfeiaelfjsa='
#
puts validator.validate(url, params, twilio_signature)
#
puts "+++ Exit."
