console.log("++ Start.");
// const client = require('twilio')(process.env.ACCOUNT_SID_TFP, process.env.AUTH_TOKEN_TFP);
const client = require('twilio')(process.env.API_KEY_TFP, process.env.API_KEY_SECRET_TFP, {accountSid: process.env.ACCOUNT_SID_TFP});

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const outgoingApplicationSid = process.env.VOICE_TWIML_APP_SID_TFP;
const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingApplicationSid
            // ,incomingAllow: true, // Optional: add to allow incoming calls
});

var userIdentity = 'dave';
console.log('+ generateVoiceToken/userIdentity: ' + userIdentity);
var token = new AccessToken(
        process.env.ACCOUNT_SID,
        process.env.API_KEY,
        process.env.API_KEY_SECRET,
        {identity: userIdentity}
);
token.addGrant(voiceGrant);
console.log("+ Token: " + token.toJwt());

// eof