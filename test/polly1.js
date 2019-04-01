// -----------------------------------------------------------------------------
console.log("+++ Start\n");

const VoiceResponse = require('twilio').twiml.VoiceResponse;
let twiml = new VoiceResponse();
twiml.pause({length: 1});
const say1 = twiml.say(
        {
            voice: 'Polly.Joanna'
        },
        'Polly Joanna: First message.'
        );
twiml.pause({length: 1});
const say2 = twiml.say(
        {
            voice: 'Polly.Salli'
        },
        'Polly Salli: Second message.'
        );
say2.ssmlProsody(
        {
            pitch: '-30%',
            rate: '80%',
            volume: '-12dB'
        },
        'Change pitch, rate, and volume: Third message.'
        );
say2.ssmlProsody(
        {
            pitch: '+30%',
            rate: '120%',
            volume: '+12dB'
        },
        'Change pitch, rate, and volume: Fourth message.'
        );
twiml.pause({length: 1});
console.log(twiml.toString());

console.log("");

let twiml2 = new VoiceResponse();
twiml2.pause({length: 1});
const say3 = twiml2.say(
        {voice: 'Polly.Emma'},
        'Polly Emma: First message.'
        );
say3.ssmlEmphasis(
        {
            level: 'Strong'
        },
        'Second message. Emphasized'
        );
console.log(twiml2.toString());

// -----------------------------------------------------------------------------
console.log("\n+++ Exit.");
