require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["ACCOUNT_SID"]
auth_token = ENV["AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
#
notifySid = ENV["NOTIFY_SERVICE_SID"]
puts "+ Create bindings in NOTIFY_SERVICE_SID: " + notifySid
binding = @client.notify.services(notifySid)
    .bindings.create(
        identity: 'stacy',
        binding_type: 'sms',
        address: ENV['PHONE_NUMBER_1']
    )
puts "++ " + binding.sid + " " + binding.binding_type + " " + binding.identity + " " + binding.address
