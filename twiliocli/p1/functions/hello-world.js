exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello there!');
  callback(null, twiml);
};
