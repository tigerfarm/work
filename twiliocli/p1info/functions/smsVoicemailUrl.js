// Only works with a registered Twilio phone number that is doing the sending.
// Forward SMS messages to my mobile phone number.
// localhost:3000/smsVoicemailUrl?From=mynum&Body=Voicemail-URL&RecordingDuration=5&RecordingUrl=https://api.twilio.com
exports.handler = function (context, event, callback) {
    let theFrom = event.From || null;
    if (theFrom == null) {
        console.log("- Required parameter: From.");
        callback(null, "- Required parameter: From.");
        process.exit(0);
    }
    let theBody = event.Body || null;
    if (theBody === null) {
        console.log("- Required parameter: Body.");
        callback(null, "- Required parameter: Body.");
        process.exit(0);
    }
    let theRecordingDuration = event.RecordingDuration || null;
    let theRecordingUrl = event.RecordingUrl || null;
    //
    // With security changes, Twilio account SID and auth token 
    // are require to access the recording.
    if (theRecordingUrl !== null) {
        // 012345678901234567890123456789
        // https://api.twilio.com...
        theRecordingUrl = "https://" + context.ACCOUNT_SID + ":" + context.AUTH_TOKEN
                + "@" + theRecordingUrl.substring(8, theRecordingUrl.length) + '.mp3';
        console.log("+ theRecordingUrl: " + theRecordingUrl);
    }
    //
    console.log("+ Send SMS notification to your phone, From: " + theFrom + ", " + theBody);
    const twilioClient = context.getTwilioClient();
    // Send message content separate from the URL.
    twilioClient.messages.create({
        from: context.SMS_FROM_PHONE_NUMBER,
        to: context.SMS_TO_PHONE_NUMBER,
        body: "+++ SMS from: " + theFrom + ", " + theBody
                + " duration in seconds: " + theRecordingDuration
    }
    );
    twilioClient.messages.create({
        from: context.SMS_FROM_PHONE_NUMBER,
        to: context.SMS_TO_PHONE_NUMBER,
        body: theRecordingUrl
    }
    ).then(message => {
        callback(null, 'SMS sent');
    });
};