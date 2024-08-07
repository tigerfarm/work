' Send an SMS message using the Twilio library
' To compile:
'   vbnc -r:lib/Twilio.dll -r:lib/Newtonsoft.Json.dll -out:sendsmsMedia.exe sendsmsMedia.vb
' To run:
'   export MONO_PATH=lib
'   mono sendsmsMedia.exe
'
' Unfortunately, MediaUrl or mediaurl do not work as parameters.
' Reference: https://www.twilio.com/en-us/blog/how-to-send-sms-messages-vbnet
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

'         1         2         3         4         5         6
' 23456789012345678901234567890123456789012345678901234567890
'    Dim mediaUrl = New List(Of Uri)() From { New Uri("https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg") }

    Try
      Dim Message As MessageResource = MessageResource.Create(
        to := ToNumber,
        from := FromNumber,
        body := "Test #1e from VB .NET/mono/OS X"
      )
'        mediaurl := MediaURL
'   ,
'        MediaUrl := "https://tfpbooks.herokuapp.com/images/topImgLeft.jpg"
      Console.WriteLine(Message.Sid)
      Console.WriteLine("Sent")
    Catch
      Console.WriteLine("Not Sent")
    End Try
  End Sub

End Class