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
            // Use your Auth Token from twilio.com/console
            var validator = new RequestValidator("123...abc");
            //
            // All the POST parameters listed.
            var parameters = new Dictionary<string, string>
            {
		        {"body","rbody"}
            };
            // The Twilio POST request URL.
            const string url = "https://example.com/show";
            // The X-Twilio-Signature request header.
            const string twilioSignature = "y...Q=";
            Console.WriteLine("++ Validation is: " + validator.Validate(url, parameters, twilioSignature));
            Console.WriteLine("+++ Exit.");
        }
    }
}
