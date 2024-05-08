using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers;

namespace httpGetTlsTest
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			Console.WriteLine("+++ Start");
			Task t = new Task(HTTP_GET);
			t.Start();
			Console.ReadLine();
			Console.WriteLine("+++ Exit");
		}
		static async void HTTP_GET()
		{
                        string ACCOUNT_SID = "your_account_SID";
                        string AUTH_TOKEN = "your_account_auth_token";
			Console.WriteLine("+ ACCOUNT_SID:      " + ACCOUNT_SID);
			Console.WriteLine("+ AUTH_TOKEN:       " + AUTH_TOKEN);
			//
			string theURL = "https://lookups.twilio.com/v1/PhoneNumbers/+15108675310";
			// Following has too many digits.
			// string theURL = "https://lookups.twilio.com/v1/PhoneNumbers/+151086753109";
			// Following also retrieves carrier information.
			// string theURL = "https://lookups.twilio.com/v1/PhoneNumbers/+15108675310?Type=carrier";
			Console.WriteLine("++ GET: + " + theURL);
			//
			// HTTP GET using handler Credentials.
			HttpClientHandler handler = new HttpClientHandler
			{
				Credentials = new System.Net.NetworkCredential(ACCOUNT_SID, AUTH_TOKEN)
			};
			HttpClient client = new HttpClient(handler);
			HttpResponseMessage response = await client.GetAsync(theURL);
			HttpContent content = response.Content;
			Console.WriteLine("+ Response StatusCode: " + (int)response.StatusCode);
			string result = await content.ReadAsStringAsync();
			if (result != null && result.Length >= 50)
			{
				Console.WriteLine("+ Response: " + result);
				Console.WriteLine("+ End of response.");
			}
		}
	}
}
