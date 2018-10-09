
// -----------------------------------------------------------------------------
console.log("+++ Start echo.");
const accountSid = process.env.ACCOUNT_SID;
console.log("+ ACCOUNT_SID      :" + accountSid + ":");

// From: https://www.twilio.com/docs/iam/access-tokens

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Used when generating any kind of tokens
const twilioAccountSid = process.env.ACCOUNT_SID;
const twilioApiKey = 'SK1080a9c863d003a65a9bdc78c0a27c78';
const twilioApiSecret = 'bRAZjdORQJdT12dXzwmF2Xpb6R1OZWjv';

// Used specifically for creating Voice tokens
const outgoingApplicationSid = 'AP7bcb6d12228748038b9baa65566a615a';
const identity = 'user';

// Create a "grant" which enables a client to use Voice as a given user
const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingApplicationSid,
    incomingAllow: true
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
token.addGrant(voiceGrant);
token.identity = identity;

// Serialize the token to a JWT string
console.log(token.toJwt());
// -----------------------------------------------------------------------------
console.log("+++ Exit.");
