// -----------------------------------------------------------------------------
console.log("+++ Start.");

// -----------------------------------------------------------------------------
// Emulates Twilio environment.

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
console.log("+ ACCOUNT_SID        :" + accountSid + ":");
console.log("+ AUTH_TOKEN         :" + authToken + ":");

function callback(aValue, theText) {
    console.log("++ Function callback response: " + theText + "\n");
}

// Parameters from the caller.
var event = {Body: "1-123-555-1111,1-123-555-2222,1-123-555-3333", From: "1-123-555-8888", To: "1-123-555-9999"};

// -----------------------------------------------------------------------------
// Same as a Function.
// exports.handler = function(context, event, callback) {
    
let msgText = event.Body;
console.log("+ Message text :" + msgText + ":");

// Your code to process the parameters and return a response string.

let theResponse = "okay";

callback(null, theResponse);

// }

// -----------------------------------------------------------------------------
// Same as a Function.
// exports.handler = function(context, event, callback) {

// When used in a Function, replace these 2 lines with: let twiml = new Twilio.twiml.VoiceResponse();
const VoiceResponse1 = require('twilio').twiml.VoiceResponse;
let response = new VoiceResponse1();
// let twiml = new Twilio.twiml.VoiceResponse();

const gather = response.gather({
    input: 'speech dtmf',
    timeout: 3,
    numDigits: 1,
    action: 'http://www.tigerfarmpress.com/python/twEchoReq'
});
gather.say('Please press 1 or say sales for sales.');

callback(null, response);

// }

// -----------------------------------------------------------------------------
// Same as a Function.
// exports.handler = function(context, event, callback) {

// When used in a Function, replace these 2 lines with: let twiml = new Twilio.twiml.VoiceResponse();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
let twiml = new VoiceResponse();
// let twiml = new Twilio.twiml.VoiceResponse();

twiml.pause({length: 1});
twiml.say(
        {
            voice: 'alice'
        },
        "Harmonizing with pixies on a Midsummer's eve"
        );
twiml.pause({length: 1});

callback(null, twiml);

// }

// -----------------------------------------------------------------------------
console.log("+++ Exit.");
