exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  const theEnvP1 = context.p1 || "default value";
  twiml.say('+ Environment variable value, p1: ' + theEnvP1);
  callback(null, twiml);
};
