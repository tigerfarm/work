console.log("++ Generate a Conversations token.");

const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

twilioAccountSid = process.env.MASTER_ACCOUNT_SID;
twilioApiKey = process.env.API_KEY;
twilioApiSecret = process.env.API_KEY_SECRET;
const identity = 'dave';
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity}
);
const serviceSid = 'IS973ddbf230364f8dab02c6418779a602';
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});
token.addGrant(chatGrant);
// Serialize the token to a JWT string
console.log(token.toJwt());
