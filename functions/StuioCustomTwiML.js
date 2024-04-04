// Standalone Custom Studio TwiML
exports.handler = function (context, event, callback) {
    console.log('Run the Custom Studio TwiML.');
    let twiml = new Twilio.twiml.VoiceResponse();
    twiml.say("Hello from, Custom Studio TwiML. Play an MP3 file.");
    twiml.play('https://about-time-2357.twil.io/assets/Keats01.mp3');
    twiml.say("Now return back to the Studio flow.");
    //
    // Redirect back to the Studio flow using the Studio's Trigger's Webhook URL.
    twiml.redirect('https://webhooks.twilio.com/v1/Accounts/AC1...d/Flows/FW1d...f2?FlowEvent=audioComplete');
    //
    callback(null, twiml);
};

// 2 Step Custom Studio TwiML - record 1
// This Function as an action URL to the next Custom Studio TwiML.
exports.handler = function (context, event, callback) {
    console.log('Run the Custom Studio TwiML.');
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    let exec = new VoiceResponse();
    exec.record({
        action: 'https://about-time-2357.twil.io/cstr2',
        timeout: 2,
        method: 'POST',
        recordingStatusCallbackMethod: 'POST'
    });
    callback(null, exec);
};

// 2 Step Custom Studio TwiML - record 2
exports.handler = function (context, event, callback) {
    console.log('Run cstr2.');
    // console.log('+ event: ' + JSON.stringify(event));
    theRecordUrl = event.RecordingUrl + ".mp3";
    console.log('+ event.RecordingUrl: ' + theRecordUrl);
    //
    // Create custom TwiML
    //  followed by a redirect back to the Studio flow, using the Studio's Trigger's Webhook URL.
    let twiml = new Twilio.twiml.VoiceResponse();
    twiml.say("Next, play the recorded voicemail message:");
    twiml.play(theRecordUrl);
    twiml.redirect('https://webhooks.twilio.com/v1/Accounts/AC1...d/Flows/FWbe...ee?theRecordUrl=' + theRecordUrl + '&FlowEvent=audioComplete');
    callback(null, twiml);
};

