/*
    Send a notification the Authy client.
    In this example, the notification is that an SMS was received.
    Can use this for a Twilio phone number.
*/
exports.handler = function(context, event, callback) {
	API_KEY = context.AUTHY_API_KEY;
	AuthyId = context.AUTHY_ID;
	theRequest = "https://api.authy.com/onetouch/json/users/" + AuthyId + "/approval_requests?api_key=" + API_KEY;
	var theParameters = 'message=SMS to: ' + event.To + " From: " + event.From + " : " + event.Body;
	console.log('+ Received an SMS: ' + theParameters);
  	//
  	let NoResponse = new Twilio.twiml.MessagingResponse();
	var got = require('got');
	got.post(theRequest + "&" + theParameters,
        {body: "abc"
        }).then(function (response) {
    	console.log(response.body);
      	callback(null, NoResponse);
	}).catch(function (error) {
    	console.log(error);
    	callback(null, NoResponse);
	});
};