# require 'rubygems'
require 'twilio-ruby'
account_sid = ENV["MASTER_ACCOUNT_SID"]
auth_token = ENV["MASTER_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)

puts "+ 10 countries that Twilio has available phone numbers."
available_phone_numbers = @client.available_phone_numbers.list(limit: 10)
available_phone_numbers.each do |record|
  puts record.country_code
end

puts "+ 10 Twilio available phone numbers in the area code: 510."
local = @client.available_phone_numbers('US').local.list(
            area_code: 510,
            limit: 10
        )
local.each do |record|
  puts record.friendly_name
end

puts "+ 10 US Twilio available phone numbers."
local = @client.available_phone_numbers('US').local.list(limit: 10)
local.each do |record|
  puts record.friendly_name
end