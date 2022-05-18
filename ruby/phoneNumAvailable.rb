# require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["MASTER_ACCOUNT_SID"]
auth_token = ENV["MASTER_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)

available_phone_numbers = @client.available_phone_numbers.list(limit: 20)
available_phone_numbers.each do |record|
  puts record.country_code
end

local = @client.available_phone_numbers('US').local.list(
            area_code: 510,
            limit: 20
        )
local.each do |record|
  puts record.friendly_name
end