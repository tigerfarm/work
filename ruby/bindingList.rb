require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["ACCOUNT_SID"]
auth_token = ENV["AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
#
notifySid = ENV["NOTIFY_SERVICE_SID"]
puts "+ List bindings for NOTIFY_SERVICE_SID: " + notifySid
bindings = @client.notify
    .services(notifySid)
    .bindings
    .list
#
bindings.each do |record|
  puts "++ " + record.sid + " " + record.binding_type + " " + record.identity + " " + record.address
end
puts "+ End of list."