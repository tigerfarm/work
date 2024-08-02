' Hello world program
' To compile:
' $ vbnc http.vb
' To run:
' mono http.exe
'
' Can add parameter to change the output executable file name.
' vbnc -out:hello1.exe hello.vb
'
' How to do command line args:
' strFriendlyName = CmdArgs(0)
' to1 = CmdArgs(1)
' strEventID = CmdArgs(2)
' strBody = CmdArgs(3)
'
' I can send 1 media attachment.
' When sending 2 media attachments:
' + sometimes 1 media file would be sent
' + or the send request would fail: Error Code 11200, Error Message HTTP retrieval failure.
' My testing confirmed that the VB library is not working for multiple MediaUrl values.
'
Imports System

Class Example
  Overloads Shared Sub Main(ByVal args() As String)

    Console.WriteLine("Sent")
    Dim SID As String = Environment.GetEnvironmentVariable("ACCOUNT_SID")
    Dim PASS As String = Environment.GetEnvironmentVariable("AUTH_TOKEN")
    Dim twilio_url As String = "https://api.twilio.com/2010-04-01/Accounts/" + SID + "/Messages.json"
    Dim SMSSendFromNumber As String = Environment.GetEnvironmentVariable("MAIN_PN_8003")
    Dim ToNumber As String = Environment.GetEnvironmentVariable("MY_PHONE_NUMBER")

    Dim client As New System.Net.WebClient
    client.UseDefaultCredentials = True
    client.Credentials = New System.Net.NetworkCredential(SID, PASS)

    Dim reqparm As New System.Collections.Specialized.NameValueCollection
    reqparm.Add("From", SMSSendFromNumber)
    reqparm.Add("To", ToNumber)
    reqparm.Add("Body", "media1i")
'
    reqparm.Add("MediaUrl", "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg")
'    reqparm.Add("MediaUrl", "https://tfpbooks.herokuapp.com/images/topImgLeft.jpg")
'
    reqparm.Add("MediaUrl", "http://www.centurisoft.com/wp-content/uploads/2014/10/logo.png")
'    reqparm.Add("MediaUrl", "Http://66.37.145.96:8990/basictest.mp3")

Try
    Dim responsebytes As Byte() = client.UploadValues(twilio_url, "POST", reqparm)
    Dim responsebody As String = (New Text.UTF8Encoding).GetString(responsebytes)
    Console.WriteLine("+ Twilio SMS: Success.")
    Console.WriteLine("+ responsebody: " + responsebody)
Catch ex As Exception
    Console.WriteLine("- Twilio SMS: Failure.")
End Try

  End Sub
End Class

' eof