const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twiml = new VoiceResponse();

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const response = new MessagingResponse();
// const message = response.message();
// message.body('Hello there');
console.log(response.toString());
