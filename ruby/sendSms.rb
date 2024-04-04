# require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["MASTER_ACCOUNT_SID"]
auth_token = ENV["MASTER_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
puts "+ Send message, from: " + ENV["MASTER_PHONE_NUMBER_2"] + " To: " + ENV["MASTER_PHONE_NUMBER_1"]
message = @client.messages.create(
    from: ENV["MASTER_PHONE_NUMBER_2"],
    to: ENV["MASTER_PHONE_NUMBER_1"],
    body: 'Hello from Ruby.'
    )
puts message.sid
