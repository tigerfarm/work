require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["MASTER_ACCOUNT_SID"]
auth_token = ENV["MASTER_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
messages = @client.messages.list(
    date_sent_after: Time.new(2020, 5, 21, 21, 0, 0),
    date_sent_before: Time.new(2020, 5, 21, 22, 0, 0),
    limit: 20
)
# List of properties for output:
# https://www.twilio.com/docs/sms/api/message-resource#message-properties
messages.each do |record|
  puts record.sid + ", " + record.date_created.utc.strftime('%m/%d/%Y %H:%M %p') + ", " + record.from + ", " + record.to
end