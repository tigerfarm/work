# Docs: https://www.twilio.com/docs/phone-numbers/api/availablephonenumberlocal-resource
#
# require 'rubygems'
require 'twilio-ruby'
#
account_sid = ENV["MASTER_ACCOUNT_SID"]
auth_token = ENV["MASTER_AUTH_TOKEN"]
@client = Twilio::REST::Client.new(account_sid, auth_token)

puts "\n+ 10 countries that Twilio has available phone numbers."
available_phone_numbers = @client.available_phone_numbers.list(limit: 10)
available_phone_numbers.each do |record|
  puts record.country_code
end

puts "\n+ 10 Twilio available phone numbers in the area code: 510."
local = @client.available_phone_numbers('US').local.list(
            area_code: 510,
            limit: 10
        )
local.each do |record|
  puts record.friendly_name
end

puts "\n+ 10 US Twilio available phone numbers."
local = @client.available_phone_numbers('US').local.list(limit: 10)
local.each do |record|
  puts record.friendly_name
end

# https://www.twilio.com/docs/phone-numbers/api/availablephonenumber-resource
puts "\n+ Twilio available phone number country info."
results = @client.available_phone_numbers('US').fetch
puts "++ country: #{results.country}"
puts "++ country_code: #{results.country_code}"
puts "++ beta: #{results.beta}"

