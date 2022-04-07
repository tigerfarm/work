console.log("++ Generate a Conversations Token.");

const AccessToken = require('../../node_modules/twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

const twilioAccountSid = process.env.ACCOUNT_SID;
const twilioApiKey = process.env.MASTER_API_KEY;
const twilioApiSecret = process.env.MASTER_API_KEY_SECRET;

const identity = 'dave';
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity, ttl: 43200}  // ttl is good for 12 hours.
);

// Link when using Conversations default service:
// https://www.twilio.com/console/conversations/configuration/defaults
// const serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55';
const serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
  serviceSid: serviceSid
});
token.addGrant(chatGrant);

// Serialize the token to a JWT string
// console.log(token.toJwt());
console.log("+ token.toJwt(): " + token.toJwt());

