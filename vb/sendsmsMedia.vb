' Send an SMS message using the Twilio library
' To compile:
' vbnc -r:lib/Twilio.dll -r:lib/Newtonsoft.Json.dll -out:sendsmsMedia.exe sendsmsMedia.vb
' To run:
' export MONO_PATH=lib
' mono sendsmsMedia.exe
'
' Unfortunately, MediaUrl or mediaurl do not work as parameters.
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
    Dim MediaURL As String = "https://tfpbooks.herokuapp.com/images/topImgLeft.jpg"

    Try
      Dim Message As MessageResource = MessageResource.Create(
        to:=ToNumber,
        from:=FromNumber,
        body:="Test #1b from VB .NET/mono/OS X",
        mediaurl:="https://tfpbooks.herokuapp.com/images/topImgLeft.jpg"
      )
'        mediaurl:=MediaURL
'   ,
'        MediaUrl:="https://tfpbooks.herokuapp.com/images/topImgLeft.jpg"
      Console.WriteLine(Message.Sid)
      Console.WriteLine("Sent")
    Catch
      Console.WriteLine("Not Sent")
    End Try
  End Sub

End Class