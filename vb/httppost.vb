' HTTP POST request
Imports System
Class Example
  Overloads Shared Sub Main(ByVal args() As String)
      Dim AccountSid As String = Environment.GetEnvironmentVariable("MASTER_ACCOUNT_SID")
      Dim GatewayAPI As String
      Console.WriteLine("+ Hello there.")
      GatewayAPI = "https://api.twilio.com/2010-04-01/Accounts/" + AccountSid + "/SMS/Messages.json?"
      Console.WriteLine("+ GatewayAPI: " + GatewayAPI)
      ' ogateway = Server.CreateObject("MSXML2.XMLHTTP.6.0")
      ' With ogateway
      ' .Open("POST", GatewayAPI, False, accountSid, authToken)
      ' .setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      ' .Send("From=+1" & twiliocell & "&To=+1" & tophone & "&Body=" & msg)
      ' ResponseString = .responseText
  End Sub
End Class
' eof