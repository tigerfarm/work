const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twiml = new VoiceResponse();

let dialParams = {};
dialParams.callerId = process.env.PHONE_NUMBER3;
const dial = twiml.dial(dialParams);
dial.number(process.env.PHONE_NUMBER4);

console.log(twiml.toString());