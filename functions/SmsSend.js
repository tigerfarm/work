// Sample test URL:
// https://abouttime-2357.twil.io/sendsms?From=+16505551111&To=+16505552222&Body=Hello1
exports.handler = function (context, event, callback) {
    let msgFrom = event.From || null;
    if (msgFrom === null) {
        console.log("-- Required parameter: From.");
        callback(null, "-- Required parameter: From.");
        return;
    }
    let msgTo = event.To || null;
    if (msgTo === null) {
        console.log("-- Required parameter: To.");
        callback(null, "-- Required parameter: To.");
        return;
    }
    let msgBody = event.Body || null;
    if (msgBody === null) {
        console.log("-- Required parameter: Body.");
        callback(null, "-- Required parameter: Body.");
        return;
    }
    console.log("Send SMS message from: " + msgFrom + " to: " + msgTo + " : " + msgBody);
    // Fetch already initialized Twilio REST client
    const twilioClient = context.getTwilioClient();
    twilioClient.messages.create({
        from: msgFrom,
        to: msgTo,
        body: msgBody
    }, function (err, result) {
        console.log('Created message using callback');
        console.log(result.sid);
        callback(null, "Message sent, SID: " + result.sid);
    });
}
