exports.handler = function(context, event, callback) {
	let msgFrom = event.From || null;
    if (msgFrom === null) {
           console.log("-- Required parameter: msgFrom.");
           callback(null, "-- Required parameter: msgFrom.");
           return;
    }
	let msgTo = event.To || null;
    if (msgTo === null) {
           console.log("-- Required parameter: msgTo.");
           callback(null, "-- Required parameter: msgTo.");
           return;
    }
	let msgBody = event.Body || null;
    if (msgBody === null) {
           console.log("-- Required parameter: msgBody.");
           callback(null, "-- Required parameter: msgBody.");
           return;
    }
	console.log("Send SMS message from: " + msgFrom + " to: " + msgTo + " : " + msgBody);
	// Fetch already initialized Twilio REST client
	const twilioClient = context.getTwilioClient();
	twilioClient.messages.create({
		from: msgFrom,
		to: msgTo,
		body: msgBody
	}, function(err, result) {
		console.log('Created message using callback');
		console.log(result.sid);
		callback(null, "Message sent, SID: " + result.sid);
	});

	let msgTo2 = "+16505552222";
	console.log("Send SMS message from: " + msgFrom + " to: " + msgTo2 + " : " + msgBody);
	// Fetch already initialized Twilio REST client
	// const twilioClient = context.getTwilioClient();
	twilioClient.messages.create({
		from: msgFrom,
		to: msgTo2,
		body: msgBody
	}, function(err, result) {
		console.log('Created message using callback');
		console.log(result.sid);
		callback(null, "Message sent, SID: " + result.sid);
	});

    
}