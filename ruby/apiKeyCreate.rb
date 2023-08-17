# require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["MAIN_ACCOUNT_SID"]
auth_token = ENV["MAIN_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
puts "+ Create API key for account: " + account_sid
# Twilio::REST::Api::V2010::AccountContext::NewKeyInstance
# 
# new_key = @client.new_keys.create(friendly_name: 'ruby2')
# new_key = @client.account.new_keys(friendly_name: 'ruby2')
new_key = @client.api.v2010.account.new_keys.create(friendly_name: 'ruby2')
puts new_key.sid
