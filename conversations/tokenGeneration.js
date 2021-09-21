console.log("++ Generate a Conversations token.");

const AccessToken = require('../../node_modules/twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

twilioAccountSid = process.env.MASTER_ACCOUNT_SID;
twilioApiKey = process.env.API_KEY;
twilioApiSecret = process.env.API_KEY_SECRET;
const identity = 'dave';
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity, ttl:3600}
);
const serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});
token.addGrant(chatGrant);
// Serialize the token to a JWT string
console.log(token.toJwt());
