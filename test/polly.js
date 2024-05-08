// -----------------------------------------------------------------------------
console.log("+++ Start\n");

// -----------------------------------------------------------------------------
function callback(aValue, theText) {
    console.log("++ Function callback response: " + theText + "\n");
}

// -----------------------------------------------------------------------------
// Same as a Function.
// exports.handler = function(context, event, callback) {

// When used in a Function, replace these 2 lines with: let twiml = new Twilio.twiml.VoiceResponse();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
let twiml = new VoiceResponse();
// let twiml = new Twilio.twiml.VoiceResponse();

// -----------------------------------------------------------------------------
const say = twiml.say(
  {
    voice: 'Polly.Joanna'
  },
  'Hi'
);
say.ssmlProsody(
  {
    pitch: '-10%',
    rate: '85%',
    volume: '-6dB'
  },
  'Words to speak'
);
twiml.say.ssmlProsody(
  {
    pitch: '-10%',
    rate: '85%',
    volume: '-6dB'
  },
  'Words to speak'
);
callback(null, twiml);
// <?xml version="1.0" encoding="UTF-8"?>
// <Response>
// <Say voice="Polly.Joanna">Hi
// <prosody pitch="-10%" rate="85%" volume="-6dB">Words to speak</prosody>
// </Say>
// </Response>

// -----------------------------------------------------------------------------
twiml.pause({length: 1});
twiml.say(
        {
            voice: 'alice'
        },
        "Harmonizing with pixies on a Midsummer's eve"
        );
twiml.pause({length: 1});

callback(null, twiml);

// console.log("+ Response: " + response.toString());

// -----------------------------------------------------------------------------
console.log("+++ Exit.");
