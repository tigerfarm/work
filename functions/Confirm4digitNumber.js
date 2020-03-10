exports.handler = function(context, event, callback) {
	theNumber = event.Digits;
	theNumberSplit = theNumber.split('');
	if (theNumberSplit.length == 4) {
    	splitNumbers = theNumberSplit[0] + " " + theNumberSplit[1] + " " + theNumberSplit[2] + " " + theNumberSplit[3] + " "
	} else {
	    splitNumbers = "Sorry, I didn't get 4 digits."
	}
	console.log("+ theNumber = " + splitNumbers);
	
	let twiml = new Twilio.twiml.VoiceResponse();
    twiml.say({voice: 'alice',language: 'en-US',},"You entered: " + splitNumbers);
    callback(null, twiml);
};