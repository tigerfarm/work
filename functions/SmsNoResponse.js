exports.handler = function(context, event, callback) {
  console.log("Received an SMS from: "+ event.From + " : " + event.Body);
  let twiml = new Twilio.twiml.MessagingResponse();
  // twiml.message("SMS Log Message Function");
  callback(null, twiml)
};