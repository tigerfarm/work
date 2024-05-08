' List SMS message log data using the Twilio library
'
' *** Program doesn't work
'
' To compile:
' vbnc -r:lib/Twilio.dll -r:lib/Newtonsoft.Json.dll -out:sendsms.exe sendsms.vb
' To run:
' export MONO_PATH=lib
' mono sendsms.exe
'
' Note: Convert PhoneNumber to a String
' Dim FromRec As String = record.From.ToString

Imports System
Imports Twilio
Imports Twilio.Rest.Api.V2010.Account

Class Example

  Overloads Shared Sub Main(ByVal args() As String)

    Dim AccountSid As String = Environment.GetEnvironmentVariable("ACCOUNT_SID")
    Dim AuthToken As String = Environment.GetEnvironmentVariable("AUTH_TOKEN")
    TwilioClient.Init(AccountSid,AuthToken)

    Console.WriteLine("List of messages.")
    ' Dim Messages As Object = MessageResource.Read()
    Dim Messages = MessageResource.Read()
    For Each message In Messages
        Console.WriteLine(message.Sid)
        Console.WriteLine(message.To)
    Next
    Console.WriteLine("End of list.")

  End Sub

End Class