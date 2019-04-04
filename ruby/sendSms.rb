require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["ACCOUNT_SID"]
auth_token = ENV["AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
puts "+ Send message, from: " + ENV["PHONE_NUMBER_4"] + " To: " + ENV["PHONE_NUMBER_5"]
message = @client.messages.create(
    from: ENV["PHONE_NUMBER_4"],
    to: ENV["PHONE_NUMBER_5"],
    body: 'Hello from Ruby.'
    )
puts message.sid