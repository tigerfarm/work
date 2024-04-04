console.log("++ Generate a Conversations token.");

const AccessToken = require('../../node_modules/twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

const twilioAccountSid = process.env.ACCOUNT_SID;
const twilioApiKey = process.env.MAIN_API_KEY;
const twilioApiSecret = process.env.MAIN_API_KEY_SECRET;

const identity = 'dave';
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity, ttl: 3600}
);
const serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});
token.addGrant(chatGrant);
// Serialize the token to a JWT string
console.log(token.toJwt());
