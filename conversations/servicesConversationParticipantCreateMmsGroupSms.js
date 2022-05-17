console.log("++ Create an Chat participant for a conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
//
// Now I'm getting: - Error: Group MMS is not enabled for this Account.
//
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";

// No participant Identity.
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            messagingBinding: {
                // Person's mobile phone number.
                // address: process.env.MY_PHONE_NUMBER
                address: "+16503790007"
            }
            // No identity attribute.
            // Have not tested if attributes attribute, can be used here.
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });
