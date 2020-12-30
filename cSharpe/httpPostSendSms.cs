using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net.Http;
namespace twSendSmsPost
{
 class MainClassPost
 {
  public static void Main1(string[] args)
  {
      Console.WriteLine("+++ Start: twSendSmsPost");
      Task t = new Task(httpPostMessage);
      t.Start();
      Console.ReadLine();
      Console.WriteLine("+++ Exit: twSendSmsPost");
  }
  static async void httpPostMessage()
  {
      string ACCOUNT_SID = "your_account_SID";
      string AUTH_TOKEN = "your_account_auth_token";
      string theURL = "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages";
      var sendFrom = "your_twilio_phone_number"; // Example format: +12223331234
      var sendTo = "your_mobile_phone_number";
      var theMessage = "POST: Hello World";
      var formContent = new FormUrlEncodedContent(new[]
      {
        new KeyValuePair<string, string>("From", sendFrom),
        new KeyValuePair<string, string>("To", sendTo),
        new KeyValuePair<string, string>("Body", theMessage)
      });
      Console.WriteLine("++ POST: + " + theURL);
      HttpClientHandler handler = new HttpClientHandler
      {
        Credentials = new System.Net.NetworkCredential(ACCOUNT_SID, AUTH_TOKEN)
      };
      HttpClient client = new HttpClient(handler);
      HttpResponseMessage response = await client.PostAsync(theURL, formContent);
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