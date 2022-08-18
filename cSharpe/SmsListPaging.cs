// Untested, from:
//  https://stackoverflow.com/questions/38086548/twilio-getnextpage-to-page-through-sms-logs

using System;
using Twilio;

class Example
{
    static void Main (string [] args)
    {

        // Find your Account Sid and Auth Token at twilio.com/user/account
        string AccountSid = "";
        string AuthToken = "";
        var twilio = new TwilioRestClient (AccountSid, AuthToken);

        var request = new MessageListRequest ();

        var messages = twilio.ListMessages (request);

        while (messages.NextPageUri != null) {
            foreach (var message in messages.Messages) {
                Console.WriteLine (message.Body);
            }
            messages = twilio.GetNextPage<MessageResult> (messages);
        }
    }
}