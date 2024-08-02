' Send an SMS message using the Twilio library
' To compile:
' vbnc -r:lib/Twilio.dll -r:lib/Newtonsoft.Json.dll -out:sendsms3.exe sendsms3.vb
' To run:
' export MONO_PATH=lib
' mono sendsms3.exe
'
Imports System
Imports Twilio
Imports Twilio.Rest.Api.V2010.Account

Class Example

  Overloads Shared Sub Main(ByVal args() As String)
  
    Dim AccountSid As String = Environment.GetEnvironmentVariable("ACCOUNT_SID")
    Dim AuthToken As String = Environment.GetEnvironmentVariable("AUTH_TOKEN")
    TwilioClient.Init(AccountSid,AuthToken)
    Dim FromNumber As String = Environment.GetEnvironmentVariable("MAIN_PN_8003")
    Dim ToNumber As String = Environment.GetEnvironmentVariable("MY_PHONE_NUMBER")
    Try
      Dim Message As MessageResource = MessageResource.Create(
        to:=ToNumber,
        from:=FromNumber,
        body:="Test #3b from VB .NET/mono/OS X"
      )
      Console.WriteLine(Message.Sid)
      Console.WriteLine("Sent")
    Catch
      Console.WriteLine("Not Sent")
    End Try
  End Sub

End Class