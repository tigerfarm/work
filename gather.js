// -----------------------------------------------------------------------------
console.log("+++ Start gather.");
const phoneNumber1 = process.env.PHONE_NUMBER_1;
const phoneNumber2 = process.env.PHONE_NUMBER_2;
console.log("+ PHONE_NUMBER_1     :" + phoneNumber1 + ":");
console.log("+ PHONE_NUMBER_2     :" + phoneNumber2 + ":");

const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twiml = new VoiceResponse();
// twiml.gather();
// console.log("+ Gather: " + twiml.toString());
// twiml.say('Thanks');
// console.log("+ Gather say: " + twiml.toString());

const gather = twiml.gather({
    action: 'https://obedient-machine-3163.twil.io/echo',
    method: 'POST',
    input: 'dtmf',
    numDigits: 1
});


//const dialParams = twiml.dial({
//    callerId: process.env.PHONE_NUMBER_1,
    // answerOnBridge: true,
    // statusCallbackEvent: 'initiated ringing answered completed',
    // statusCallback: 'https://saffron-woodpecker-5290.twil.io/events',
    // statusCallbackMethod: 'POST',
//    timeout: 15
//}, "+16508668882");

twiml.say('Welcome to the machine.');

// twiml.dial(dialParams, process.env.PHONE_NUMBER_2);
console.log("+ Gather dial: " + twiml.toString());

// -----------------------------------------------------------------------------
console.log("+++ Exit.");
