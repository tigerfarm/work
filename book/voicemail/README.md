# Implement a Featured Rich Voicemail System

## Features:

+ If the call is answered, the caller does not get a voicemail option.
+ Set your own voicemail greeting message, and a thank you message.
+ If the caller hangs up without leaving voicemail, you will receive a missed call SMS with the caller’s phone number.
+ If the person leaves a voicemail message, you will receive an SMS text message with an active link to the voicemail message. Click/tap on the link to cause your browser to display the voicemail sound file. Click on the browser icon to hear the voicemail message.

--------------------------------------------------------------------------------
## Setup

#### Configure Twilio Functions Environment Variables

Go to: https://www.twilio.com/console/runtime/functions/configure

Check: Enable ACCOUNT_SID and AUTH_TOKEN. This is used when sending SMS messages.

Add a from-phone-number that is used to send voicemail and missed call SMS messages.
Add a to-phone-number, to receive the messages.

+ VM_FROM_PHONE_NUMBER - your_Twilio_phone_number (Your Twilio phone number that was not answered).
+ VM_TO_PHONE_NUMBER - your_mobile_phone_number to receive the voicemail messages.

#### Create a Twilio Function.

Go to Functions → Manage:

https://www.twilio.com/console/runtime/functions/manage

Click the circle icon (circle with a ‘+‘ in the middle) to create a Blank function.

+ Friendly name: Voicemail - Say thank you and send an SMS
+ Set the /path to /vmsms.
+ Sample Function URL:
https://about-time-1235.twil.io/vmsms

+ Function code:
````
exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();
    console.log("+ Caller: " + event.From);
    twiml.say({ voice:'alice',language:'en-CA'},"Thank you for your message.");
    console.log("+ Send SMS notification to your phone.");
    twilioClient.messages.create({
      from: context.VM_FROM_PHONE_NUMBER,
      to: context.VM_TO_PHONE_NUMBER,
      body: "New voicemail from: " + event.From
        + " duration: "+ event.RecordingDuration
        + " link: " + event.RecordingUrl + '.mp3'}
    ).then(message => {
      callback(null, twiml);
   	});
};
````

Sample TwiML output from the above:
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
<Say voice="alice" language="en-CA">Thank you for your message.</Say>
</Response>
````

#### Create a Twilio Function

+ Friendly name: Voicemail - record
+ Set the /path to /vmrecord.
+ Sample Function URL:
https://about-time-1235.twil.io/vmrecord

+ Function code:
````
exports.handler = function(context, event, callback) {
    console.log("+ Caller: " + event.From);
    console.log("+ DialCallStatus: " + event.DialCallStatus);
    let twiml = new Twilio.twiml.VoiceResponse();
    if (event.DialCallStatus == "completed" || event.DialCallStatus == "answered"){
        twiml.hangup();
    }
    twiml.say( {voice:'alice',language:'en-CA'},
        "Feel free to leave a message after the beep. Press the star key when finished.");
    twiml.record({
        action: "https://about-time-1235.twil.io/vmsms",
        method: "GET",
        maxLength: "21",
        finishOnKey: "*"
    });
    console.log("+ Send SMS to: " + context.VM_TO_PHONE_NUMBER);
    twilioClient.messages.create({
      from: context.VM_FROM_PHONE_NUMBER,
      to: context.VM_TO_PHONE_NUMBER,
      body: "+++ Missed WORK call from: " + event.From}
    ).then(message => {
      callback(null, twiml);
   	});
};
````
Sample TwiML output from the above:
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
<Say voice="alice" language="en-CA">Thank you for calling. You have reached the voicemail of Stacy David of Twilio. Please leave a message and I will return your call.</Say>
<Record action="/vmsms" method="GET" maxLength="31" finishOnKey="*"/>
<Sms from="+16505552222" to="+16505552222">+++ Missed WORK call from: undefined</Sms>
</Response>
````

#### Create a TwiML Bin to forward incoming calls.

Go to:

https://www.twilio.com/console/runtime/twiml-bins

+ Friendly name: DialHomeSip.
+ Sample URL:
https://www.twilio.com/console/runtime/twiml-bins/EHd2c591436a5452fcf8c2824938507b0f
+ TwiML Bin XML, if you are forwarding the incoming call to another phone number:
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="30" action="https://about-time-1235.twil.io/vmrecord">
    +16505552222
  </Dial>
</Response>
````
+ TwiML Bin XML, if you are using a SIP softphone or device:
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="30" action="https://about-time-1235.twil.io/vmrecord">
    <Sip>sip:home@example.sip.us1.twilio.com</Sip>
  </Dial>
</Response>
````
#### Configure your Twilio Phone number to use your above TwiML Bin

+ Go to your list of phone numbers.

https://www.twilio.com/console/phone-numbers/incoming

+ Click your phone number to get to the phone number's configuration page.
+ Set Voice & Fax/A Call Comes In, to: TwiML Bin, and select your above TwiML Bin.
+ Click Save.

+ Test by calling your Twilio Phone number.
+ The call should be forward as configured.

#### Create a Twilio Function

+ Friendly name: Voicemail - handle the call
+ Sample Function URL:
https://about-time-1235.twil.io/vmhandle
+ Function code:
````
exports.handler = function(context, event, callback) {
    console.log("+ Caller: " + event.From);
    console.log("+ DialCallStatus: " + event.DialCallStatus);
    msgBody = "";
    if (event.DialCallStatus == "completed" || event.DialCallStatus == "answered") {
        console.log("+ Call received and answered.");
        msgBody = "Call received and answered, from: " + event.From;
    } else {
        console.log("+ Missed a call.");
        msgBody = "Missed a call from: " + event.From;
    }
    const twilioClient = context.getTwilioClient();
    twilioClient.messages.create({
		from: context.VM_FROM_PHONE_NUMBER,
		to: context.VM_TO_PHONE_NUMBER,
		body: msgBody
	}, function(err, result) {
		console.log('Created message using callback');
		console.log(result.sid);
		callback(null, "");     // If the called number hangs up first, the caller will here the callback string.
	});
};
````

--------------------------------------------------------------------------------

Cheers...
