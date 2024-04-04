# Twilio Studio Loop

Recording loop, until a code is entered:
+ Say an annoucement message.
+ Turn recording on.
+ Use a Gather to wait while the caller is talking. The Gather widget has "#" as the "Stop gathering on keypress?"
+ When the Gather is complete, Split checks if the person entered the code. In my test, the code I selected is "#123", which is in the Split widget.  
+ When the code is entered, the flow continues to close out the call and turn recording off.

<img src="RecordUntilCodeEntered.jpg" width="400"/>

The sample Studio flow JSON includes a property that you should either remove or set.
When the record is complete and ready to be downloaded or listened, Twilio will make a request to that URL.
````
"recording_status_callback": "https://example.com/record"
````
If you want to send an SMS message with the recording information, 
add the following into the body of the SMS Message send widget:
````
Recording information,
Call SID: {{widgets.call_recording_3.CallSid}} 
Recording Sid: {{widgets.call_recording_3.Sid}} 
Tap to listen: https://api.twilio.com/2010-04-01/Accounts/
{{widgets.call_recording_3.AccountSid}}/Recordings/{{widgets.call_recording_3.Sid}}
````
And, in the SMS Message send widget, set the To phone number:
````
"to": "+16505552222"
````

Sample request from Twilio:
````
--------------------------------------------------------------------------------------
+ POST URL : https://tfpecho.herokuapp.com/rec
--------------
+ Headers : 
++ 0: "host":"tfpecho.herokuapp.com"
++ 1: "connection":"close"
++ 2: "content-type":"application/x-www-form-urlencoded; charset=UTF-8"
++ 3: "i-twilio-idempotency-token":"d50dc30c-5d0d-418d-92ea-12cd8fd05f09"
++ 4: "x-twilio-signature":"USnT9hzNGvu4NhpxyupDaSoSVyA="
++ 5: "accept":"*/*"
++ 6: "x-home-region":"us1"
++ 7: "user-agent":"TwilioProxy/1.1"
++ 8: "x-request-id":"7537df34-5cbc-4688-9a7d-cd3411114cbe"
++ 9: "x-forwarded-for":"44.202.134.240"
++ 10: "x-forwarded-proto":"https"
++ 11: "x-forwarded-port":"443"
++ 12: "via":"1.1 vegur"
++ 13: "connect-time":"0"
++ 14: "x-request-start":"1650498339596"
++ 15: "total-route-time":"0"
++ 16: "content-length":"495"
--------------
+ POST content raw : 
RecordingSource=StartCallRecordingAPI&RecordingTrack=both&RecordingSid=REe...1&RecordingUrl=https%3A%2F%2Fapi.twilio.com%2F2010-04-01%2FAccounts%2FACae...3%2FRecordings%2FREe...1&RecordingStatus=completed&RecordingChannels=2&ErrorCode=0&CallSid=CA4140f4ee9836c07ff474b7d2d9b7f75a&RecordingStartTime=Wed%2C%2020%20Apr%202022%2023%3A45%3A25%20%2B0000&AccountSid=ACa...3&RecordingDuration=11
+ POST content name value pairs: 
   "RecordingSource": "StartCallRecordingAPI",
   "RecordingTrack": "both",
   "RecordingSid": "REebf78ad0825ad0baefd8eab4dae55691",
   "RecordingUrl": "https://api.twilio.com/2010-04-01/Accounts/ACa...3/Recordings/REe...1",
   "RecordingStatus": "completed",
   "RecordingChannels": "2",
   "ErrorCode": "0",
   "CallSid": "CA4140f4ee9836c07ff474b7d2d9b7f75a",
   "RecordingStartTime": "Wed, 20 Apr 2022 23:45:25 +0000",
   "AccountSid": "ACa...3",
   "RecordingDuration": "11",
````
SMS message with the Recording info:
````
Recording information,
Call SID: CAea46c7a62a66dd9ddd6399ca0f0a885e 
Recording Sid: REe...1
Tap to listen: 
````
Then, add the Recording Sid into the following URL:
````
https://api.twilio.com/2010-04-01/Accounts/ACa...3/Recordings/REe...1
````

--------------------------------------------------------------------------------


Cheers...
