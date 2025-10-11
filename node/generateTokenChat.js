console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
var ACCOUNT_SID = process.env.MAIN_ACCOUNT_SID;
var API_KEY = process.env.CONVERSATIONS_API_KEY;
var API_KEY_SECRET = process.env.CONVERSATIONS_API_KEY_SECRET;
var theIdentity = "dave";
console.log("+ SID: " + ACCOUNT_SID
        + ", API_KEY: " + API_KEY
        + ", API_KEY_SECRET: " + API_KEY_SECRET
        + ", theIdentity: " + theIdentity);

const AccessToken = require('twilio').jwt.AccessToken;
const token = new AccessToken(
        ACCOUNT_SID,
        API_KEY,
        API_KEY_SECRET,
        {identity: theIdentity}
);
let chatGrant;
var CONVERSATIONS_SERVICE_SID = process.env.CONVERSATIONS_SERVICE_SID;
chatGrant = new AccessToken.ChatGrant({
    serviceSid: CONVERSATIONS_SERVICE_SID
});
token.addGrant(chatGrant);
// token.ttl = 1200; // Token time to live, in seconds. 1200 = 20 minutes.
// token.ttl = 600; // Token time to live, in seconds. 600 = 5 minutes. For testing token update.
token.ttl = 28800; // Token time to live, in seconds. 28800 = 8 hours
//
// Output the token.
theToken = token.toJwt();
console.log("+ theToken " + theToken);
    