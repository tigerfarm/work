console.log("++ List conversations for a participants.");
// https://www.twilio.com/docs/conversations/api/participant-conversation-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
console.log("+ Conversations service SID: " + serviceSid);

// Fetch using either the user SID or identity string.
client.conversations.services(serviceSid)
//        .users("USd6a63209cb844c4b9a8b97917a29575d")  // user SID
        .users("dave")                                  // identity string
        .fetch()
        .then(user =>
                console.log( "+ "
                        + " sid: " + user.sid
                        + " identity: " + user.identity
                        )
            );
