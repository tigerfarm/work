console.log("+++ Start.");
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const twilioAccountSid = process.env.MASTER_ACCOUNT_SID;
const twilioApiKey = process.env.MASTER_API_KEY;
const twilioApiSecret = process.env.MASTER_API_KEY_SECRET;
const identity = 'user';
const videoGrant = new VideoGrant({
  // room: 'cool room',
});
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity}
);
token.addGrant(videoGrant);
console.log(token.toJwt());
