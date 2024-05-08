using System;
using Twilio;
using Twilio.Converters;
using Twilio.Rest.Chat.V2.Service;
using System.Collections.Generic;

namespace HelloWorld
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			Console.WriteLine("+++ Set multiple permissions.");
			string accountSid = Environment.GetEnvironmentVariable("MASTER_ACCOUNT_SID");
			string authToken = Environment.GetEnvironmentVariable("MASTER_AUTH_TOKEN");
			TwilioClient.Init(accountSid, authToken);

			string[] strList = { "addMember", "createChannel", "destroyChannel" };
			List<string> listOfStr = new List<string>(strList);

                        var role = RoleResource.Create(
				friendlyName: "friendly_name",
				type: RoleResource.RoleTypeEnum.Channel,
				// permission: Promoter.ListOfOne("addMember"),
				permission: listOfStr,
				pathServiceSid: "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
			);
			Console.WriteLine(role.Sid);

		}
	}
}
