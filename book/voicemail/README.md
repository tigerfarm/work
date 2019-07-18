# Implement a Featured Rich Voicemail System

## Features:

+ If the call is answered, the caller does not get a voicemail option.
+ Set your own voicemail greeting message, and a thank you message.
+ If the caller hangs up without leaving voicemail, you will receive a missed call SMS with the caller’s phone number.
+ If the person leaves a voicemail message, you will receive an SMS text message with an active link to the voicemail message. Click/tap on the link to cause your browser to display the voicemail sound file. Click on the browser icon to hear the voicemail message.

--------------------------------------------------------------------------------
## Setup

The steps are in some what reverse order because (after the first step) each step requires something from the previous step.

#### Configure Twilio Functions Environment Variables

Go to: https://www.twilio.com/console/runtime/functions/configure

Check: Enable ACCOUNT_SID and AUTH_TOKEN. This is used when sending SMS messages.

Add a from-phone-number that is used to send voicemail and missed call SMS messages.
Add a to-phone-number, to receive the messages.

+ VM_FROM_PHONE_NUMBER - your_Twilio_phone_number (Your Twilio phone number that was not answered).
+ VM_TO_PHONE_NUMBER - your_mobile_phone_number to receive the voicemail SMS messages.

#### Create a Twilio Function to: Say thank you and send an SMS

Go to Functions → Manage:

https://www.twilio.com/console/runtime/functions/manage

Click the circle icon (circle with a ‘+‘ in the middle) to create a Blank function.

+ Friendly name: Voicemail - Say thank you and send an SMS
+ Set the /path to /vmsms.
+ Sample Function URL:
https://about-time-2357.twil.io/vmsms

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
      body: "Call to: " + event.To
        + "\n New voicemail from: " + event.From
        + "\n duration: "+ event.RecordingDuration
        + "\n link: " + event.RecordingUrl + '.mp3'}
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

#### Create a Twilio Function to handle the missed call.

Go to Functions → Manage:

https://www.twilio.com/console/runtime/functions/manage

+ Friendly name: Voicemail - record
+ Set the /path to /vmhandle.
+ Sample Function URL:
https://about-time-1235.twil.io/vmhandle

+ Function code:
````
exports.handler = function(context, event, callback) {
    console.log("+ Caller: " + event.From);
    console.log("+ DialCallStatus: " + event.DialCallStatus);
    let twiml = new Twilio.twiml.VoiceResponse();
    if (event.DialCallStatus == "completed" || event.DialCallStatus == "answered"){
        twiml.hangup();
    }
    twiml.say({ voice:'alice',language:'en-CA'},
        "Feel free to leave a message after the beep. Press the star key when finished.");
    twiml.record({
        action: "https://about-time-2357.twil.io/vmsms",
        method: "GET",
        maxLength: "21",
        finishOnKey: "*"
    });
    //
    console.log("+ Send SMS to: " + context.VM_TO_PHONE_NUMBER);
    twilioClient.messages.create({
        from: context.VM_FROM_PHONE_NUMBER,
        to: context.VM_TO_PHONE_NUMBER,
        body: "+++ Missed call to HOME number: " + event.To
          + "\n Call was from: " + event.From
    }
    ).then(message => {
        callback(null, twiml);
    });
};
````
Sample TwiML output from the above:
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
<Say voice="alice" language="en-CA">Feel free to leave a message after the beep. Press the star key when finished.</Say>
<Record action="/vmsms" method="GET" maxLength="31" finishOnKey="*"/>
<Sms from="+16505552222" to="+16505552222">+++ Missed WORK call from: undefined</Sms>
</Response>
````

#### Create a TwiML Bin to forward incoming calls.

Go to:

https://www.twilio.com/console/runtime/twiml-bins

+ Friendly name: DialHome.
+ TwiML Bin XML, if you are forwarding the incoming call to another phone number:
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="20" action="https://about-time-1235.twil.io/vmhandle">
    +16505552222
  </Dial>
</Response>
````
+ TwiML Bin XML, if you are using a SIP softphone or SIP device:
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="30" action="https://about-time-1235.twil.io/vmhandle">
    <Sip>sip:home@example.sip.us1.twilio.com</Sip>
  </Dial>
</Response>
````
#### Configure your Twilio Phone number to use the above TwiML Bin.

Go to your list of phone numbers.

https://www.twilio.com/console/phone-numbers/incoming

+ Click your phone number to get to the phone number's configuration page.
+ Set Voice & Fax/A Call Comes In, to: TwiML Bin, and select your above TwiML Bin (DialHome).
+ Click Save.

## Test

+ Test by calling your Twilio Phone number. The call should be forward as configured.
+ If you answer the call, you will not be prompted for voicemail, nor will you be sent an SMS regarding this call.
+ If you don't answer,
Twilio will make an HTTP request to the Dial action URL.
You be sent an SMS regarding a missed call. If you stay on, you will be prompted to leave a voicemail message.
++ If you leave a voicemail message, you be sent an SMS regarding the voicemail.
++ If you stay on the call after leaving a voicemail, you will hear the thank you message and then, the call will be ended.

--------------------------------------------------------------------------------

Cheers...
