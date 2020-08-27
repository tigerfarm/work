using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Exceptions;

// Create a new solution
// Right mouse click Packages and select Add Package.
// Search for Twilio, and add Twilio REST API Helper Library.

// Documentation: https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-read-list-messages-matching-filter-criteria&code-language=C%23&code-sdk-version=4.x
// API source: https://github.com/twilio/twilio-csharp/blob/master/src/Twilio/Rest/Api/V2010/Account/MessageResource.cs#L419

namespace smsList
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("+++ Start: smsList");

            string AccountSid = "AC1b32414e8ab41e56e6393bcbba7d5a9d";
            string AuthToken = "8d337407707c6bd8c733f4a601a09cee";
            TwilioClient.Init(AccountSid, AuthToken);
            var messages = MessageResource.Read(
                // from: new Twilio.Types.PhoneNumber("+16508668882")
                // dateSentBefore: new DateTime(2018, 12, 25)
            );
            // dateSentAfter
            // dateSentBefore
            // dateSent: new DateTime(2018, 12, 26)
            // dateSent: new DateTime(2016, 8, 31, 0, 0, 0),    // Year, month, day
            // from: new Twilio.Types.PhoneNumber("+15017122661"),
            // to: new Twilio.Types.PhoneNumber("+15558675310")
            foreach(var record in messages) {
                Console.WriteLine("+ " + record.Sid + " From:" + record.From + " To:" + record.To + " DateSent:" + record.DateSent);
            }
            Console.WriteLine("+++ Exit: smsList");
        }
    }
}
