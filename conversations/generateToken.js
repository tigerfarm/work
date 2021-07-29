console.log("++ Generate Conversations Token.");

const AccessToken = require('../../node_modules/twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Used when generating any kind of tokens
const twilioAccountSid = process.env.ACCOUNT_SID;
const twilioApiKey = process.env.MASTER_API_KEY;
const twilioApiSecret = process.env.MASTER_API_KEY_SECRET;

// Used specifically for creating Chat tokens
// const serviceSid = 'ISd5c080247aaa4200a730da6c6ea08990';
// Note, to communicate with the command line programs, need to use the Conversations service:
// https://www.twilio.com/console/conversations/configuration/defaults
// Because the command line programs do not have the option to select a Conversations service.
// const serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55';
const serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
const identity = 'dave';

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
  serviceSid: serviceSid
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity, ttl: 43200}  // ttl is good for 12 hours.
);

token.addGrant(chatGrant);

// Serialize the token to a JWT string
// console.log(token.toJwt());
console.log("+ token.toJwt(): " + token.toJwt());

