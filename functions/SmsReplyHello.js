exports.handler = function(context, event, callback) {
    console.log("+ Reply hello.");
    let twiml = new Twilio.twiml.MessagingResponse();
    twiml.message("Hello there");
    callback(null, twiml);
};