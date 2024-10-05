using System;
using Twilio.Security;
using System.Collections.Generic;

namespace ValidateSignatureGET
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("+++ Start, HTTP GET check a signature and content for validity.");
            // Your Auth Token from twilio.com/console
            const string authToken = "abc...def";
            // Initialize the validator
            var validator = new RequestValidator(authToken);
            //
            const string url = "https://tfpbooks.herokuapp.com/images/topImgLeft.jpg";      // For GET request
            const string twilioSignature = "mabcdefg+FKSuY6B3GeRw+p58M4=";                  // For GET request
            var parameters = new Dictionary<string, string> { };
            Console.WriteLine("++ Validation is: " + validator.Validate(url, parameters, twilioSignature));
            //
            Console.WriteLine("+++ Exit.");
        }
    }
}
