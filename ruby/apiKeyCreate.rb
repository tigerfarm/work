require 'twilio-ruby'
account_sid = ENV["MAIN_ACCOUNT_SID"]
auth_token = ENV["MAIN_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
puts "+ Create API key for account: " + account_sid
#
# Previous syntax (v5.x.x of the twilio-ruby library)
# new_key = @client.new_keys.create(friendly_name: 'ruby2')
# 
# Version 6.x.x of the twilio-ruby library:
new_key = @client.api.v2010.account.new_keys.create(friendly_name: 'ruby2')
puts new_key.sid
