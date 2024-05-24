# require 'rubygems'
require 'twilio-ruby'
account_sid = ENV['MAIN_ACCOUNT_SID']
api_key = ENV['CONVERSATIONS_API_KEY']
api_secret = ENV['CONVERSATIONS_API_KEY_SECRET']
service_sid = ENV['CONVERSATIONS_SERVICE_SID']
# Create Chat grant for our token
grant = Twilio::JWT::AccessToken::ChatGrant.new
grant.service_sid = service_sid
token = Twilio::JWT::AccessToken.new(
  account_sid,
  api_key,
  api_secret,
  [grant],
  identity: 'dave'
)
# Generate the token
puts token.to_jwt