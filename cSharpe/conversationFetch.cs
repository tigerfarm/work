using System;
using Twilio;
using Twilio.Rest.Conversations.V1;

namespace conversationFetch
{
    class Program
    {
        static void Main(string[] args)
        {
            string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
            string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

            TwilioClient.Init(accountSid, authToken);

            Console.WriteLine("++ Fetch a conversation using either the SID or unique name.");

            var theValue = "studio1u";  // studio1u or CHeae275b5ee0145ea9ffadd40ac0ec377
            var conversation = ConversationResource.Fetch(
                pathSid: theValue
            );

            Console.WriteLine(conversation.Sid);
            Console.WriteLine(conversation.UniqueName);
            Console.WriteLine(conversation.FriendlyName);
        }
    }
}
