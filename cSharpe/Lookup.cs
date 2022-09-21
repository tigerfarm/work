using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Lookups.V1;

namespace lookup
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("+ Lookup a phone number's data.");
            string accountSid = Environment.GetEnvironmentVariable("ACCOUNT_SID");
            string authToken = Environment.GetEnvironmentVariable("AUTH_TOKEN");
            Console.WriteLine("+ accountSid: " + accountSid);
            Console.WriteLine("+ authToken:  " + authToken);
            TwilioClient.Init(accountSid, authToken);
            var type = new List<string> {
                "carrier"
            };
            var phoneNumber = PhoneNumberResource.Fetch(
                type: type, // Include "type" to get carrier data.
                pathPhoneNumber: new Twilio.Types.PhoneNumber("+15108675310")
            );
            Console.WriteLine("++ phoneNumber.NationalFormat: " + phoneNumber.NationalFormat);
            Console.WriteLine("++ phoneNumber.CountryCode: " + phoneNumber.CountryCode);
            Console.WriteLine("++ Carrier: " + phoneNumber.Carrier);
        }
    }
}
