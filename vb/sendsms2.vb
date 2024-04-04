' Send an SMS message using the Twilio library
' To compile:
' vbnc -r:lib/Twilio.dll -r:lib/Newtonsoft.Json.dll -out:sendsms.exe sendsms.vb
' To run:
' export MONO_PATH=lib
' mono sendsms.exe
'
' Note: Convert PhoneNumber to a String
' Dim FromRec As String = record.From.ToString
'
Imports System
Imports Twilio
Imports Twilio.Rest.Api.V2010.Account

Class Example

  Overloads Shared Sub Main(ByVal args() As String)
  Console.WriteLine("Machine Name: " + Environment.MachineName)
    Dim AccountSid As String = Environment.GetEnvironmentVariable("ACCOUNT_SID")
    Dim AuthToken As String = Environment.GetEnvironmentVariable("AUTH_TOKEN")
    Dim PhoneNumber3 As String = Environment.GetEnvironmentVariable("PHONE_NUMBER_3")
    Dim PhoneNumber4 As String = Environment.GetEnvironmentVariable("PHONE_NUMBER_4")

    TwilioClient.Init(AccountSid,AuthToken)
    Dim FromNumber As New PhoneNumber(PhoneNumber3)
    Dim ToNumber As New PhoneNumber(PhoneNumber4)
    Dim Message = MessageResource.Create(
        toNumber,
        from := FromNumber, 
        body := "This is the ship that made the Kessel Run in fourteen parsecs?")

      Console.WriteLine(Message.Sid)
      Console.WriteLine("Sent")
  End Sub

End Class