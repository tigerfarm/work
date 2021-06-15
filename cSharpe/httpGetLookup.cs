using System;
using System.Threading.Tasks;
using System.Net.Http;

namespace HttpGet
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
      string theURL = "http://lookups.twilio.com/v1/PhoneNumbers/18182103863?Type=carrier";
      // string theURL = "http://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/SMS/Messages.csv?PageSize=1000";

      Console.WriteLine("++ GET: + " + theURL);
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