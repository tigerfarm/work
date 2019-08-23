// 1. Custom Studio TwiML to generate record and transcribe TwiML.
// Sample TwiML to created by the following Function:
//      <?xml version="1.0" encoding="UTF-8"?>
//      <Response>
//          <Record action="https://about-time-2357.twil.io/cstr2" timeout="6" 
//              transcribeCallback="https://about-time-2357.twil.io/sendTranscription" 
//              method="GET" recordingStatusCallbackMethod="GET"/>
//      </Response>
exports.handler = function(context, event, callback) {
    console.log('Run cstr2: Custom Studio TwiML.');
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    let exec = new VoiceResponse();
    exec.record({
        action: 'https://about-time-2357.twil.io/cstr2',
        timeout: 6,
        transcribeCallback: 'https://about-time-2357.twil.io/echo',
        method: 'GET',
        recordingStatusCallbackMethod: 'GET'
    });
    callback(null, exec);
};

// 2. To above action URL calls this Twilio Function to redirect back to the Studio flow.
exports.handler = function (context, event, callback) {
    console.log('Run cstr2: Redirect back to the Studio flow.');
    let twiml = new Twilio.twiml.VoiceResponse();
    twiml.redirect('https://webhooks.twilio.com/v1/Accounts/AC1...d/Flows/FWbe...ee?theRecordUrl=' + theRecordUrl + '&FlowEvent=audioComplete');
    callback(null, twiml);
};

// The transcribeCallback URL would be to another Twilio Function. 
// It receives the transcribeCallback request, which contains a URL to the transcription text, attribute: TranscriptionUrl. 
// You can use the TranscriptionUrl, with the account SID and auth token, to retrieve the transcription text, attribute: TranscriptionText. 
// Your Twilio Function would then send the TranscriptionText to your mobile phone number.
//
// Sample Function to echo the TranscriptionUrl.
exports.handler = function(context, event, callback) {
    console.log("+ event: ", event);
    data1 = event.TranscriptionUrl || "No TranscriptionUrl";
    console.log("+ TranscriptionUrl: ", data1);
    callback(null, data1);
};

