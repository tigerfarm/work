require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["ACCOUNT_SID"]
auth_token = ENV["AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
#
serviceSid = ENV["CHAT_SERVICE_SID"]
puts "+ Create bindings in CHAT_SERVICE_SID: " + serviceSid
binding = @client.chat.services(serviceSid)
    .bindings.create(
        identity: 'stacy',
        binding_type: 'sms',
        address: ENV['PHONE_NUMBER_1']
    )
puts "++ " + binding.sid + " " + binding.binding_type + " " + binding.identity + " " + binding.address
