// Make a confernce call to 2 people
exports.handler = function(context, event, callback) {
	console.log('Conference call.');
    const twilioClient = context.getTwilioClient();
    let from = event.From;
  	let to = event.To1;
  	let conferenceName = "support";
	twilioClient.conferences(conferenceName).participants.create({
    	to: to,
    	from: from
  	}).then(participant => {
      console.log("Party 1 sid: " + participant.sid);
      callback(null,null);
  	});
	twilioClient.conferences(conferenceName).participants.create({
    	to: event.To2,
    	from: from
  	}).then(participant => {
      console.log("Party 2 sid: " + participant.sid);
      callback(null,null);
  	});
};

// Used when a participant was dropped out a conference, and will now be added back into the conference.
exports.handler = function(context, event, callback) {
    console.log("This Function is called.");
    console.log("event.Digits = " + event.Digits);
    let twiml = new Twilio.twiml.VoiceResponse();
    // Return to the conference:
    twiml.redirect("https://handler.twilio.com/twiml/EH6da13358531a552d6fdefceecd979e54");
    callback(null, twiml);
};

