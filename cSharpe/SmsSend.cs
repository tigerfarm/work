using System;
using System.Net;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;	
namespace SendSms
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			Console.WriteLine("+++ Start: SendSms");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                        string accountSid = "your_account_SID";
                        string authToken = "your_account_auth_token";
                        TwilioClient.Init(accountSid, authToken);
                        var message = MessageResource.Create(
                        	to: new PhoneNumber("+1655552222"),
                        	from: new PhoneNumber("+1655551111"),
                        	body: "J'aime l'été... éÉÑñ",
                        	statusCallback: new Uri(Environment.GetEnvironmentVariable("callbackUrl"))
                        );
			Console.WriteLine("+ Message SID: " + message.Sid);
			Console.WriteLine("+++ Exit: SendSms");;
		}
	}
}
