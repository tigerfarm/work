using System;
using Twilio.Security;
using System.Collections.Generic;
namespace SignatureValidation
{
    class MainClass
    {
	public static void Main(string[] args)
	{
            Console.WriteLine("+++ Start, check a signature and content for validity.");
            // Your Auth Token from twilio.com/console
            const string authToken = "123...abc";
            var validator = new RequestValidator(authToken);
            // The Twilio GET request URL
            const string url = "https://example.com/show?body=rbody";
            // The X-Twilio-Signature request header.
            const string twilioSignature = "y...Q=";
            // All the parameters listed.
            var parameters = new Dictionary<string, string>
            {
            };
            Console.WriteLine("++ Validation is: " + validator.Validate(url, parameters, twilioSignature));
            Console.WriteLine("+++ Exit.");
        }
    }
}
