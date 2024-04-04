console.log("++ Generate voice token.");
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const outgoingApplicationSid = 'APxxxxxxxxxxxxx';
const identity = 'user';
console.log("+ outgoingApplicationSid: " + outgoingApplicationSid
        + ", identity: " + identity
        );
// Create a "grant" which enables a client to use Voice as a given user
const voiceGrant = new VoiceGrant({
  outgoingApplicationSid: outgoingApplicationSid,
  incomingAllow: true, // Optional: add to allow incoming calls
});
const token = new AccessToken(
  process.env.MAIN_ACCOUNT_SID,
  process.env.MAIN_API_KEY,
  process.env.MAIN_API_KEY_SECRET,
  {identity: identity}
);
token.addGrant(voiceGrant);
console.log(token.toJwt());
