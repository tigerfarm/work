console.log("++ Delete a credential.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theCredentialSid = 'CR93cdf633cf284b9a6014d2b1d4dfbabc';
console.log("++ Delete a credential, SID: " + theCredentialSid);
client.conversations.v1.credentials(theCredentialSid)
        .remove()
        .then(c => console.log("+ Credential deleted, SID: " + theCredentialSid));

