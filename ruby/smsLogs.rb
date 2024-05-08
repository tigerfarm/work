# https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-read-list-messages-filter-by-a-period-of-time&code-language=Ruby&code-sdk-version=5.x#read-multiple-message-resources
# 
require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["MASTER_ACCOUNT_SID"]
auth_token = ENV["MASTER_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)
messages = @client.messages.list(
    date_sent_after: Time.new(2020, 5, 21, 16, 0, 0),
    date_sent_before: Time.new(2020, 5, 21, 24, 0, 0)
)
# Optional, in the above, add property limit, to limit the number of rows retrieved. For example:
#   limit: 200
#
# List of properties for output:
# https://www.twilio.com/docs/sms/api/message-resource#message-properties
messages.each do |record|
  puts record.sid + ", " + record.date_created.utc.strftime('%m/%d/%Y %H:%M %p') + ", " + record.from + ", " + record.to
end