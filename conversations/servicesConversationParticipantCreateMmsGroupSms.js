console.log("++ Create an SMS participant for a Group SMS conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
// 
// https://www.twilio.com/docs/conversations/group-texting?code-sample=code-add-an-sms-participant-homebuyer-1&code-language=Node.js&code-sdk-version=4.x
//    "identity": null,
//    "messaging_binding": {
//      "type": "sms",
//      "address": "+15017122661"
//    },
// 
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = "CH5d63d26d30a541babe00056b46ce86ce";

// No participant Identity.
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            messagingBinding: {
                // Person's mobile phone number.
                // address: process.env.MY_PHONE_NUMBER
                // address: "+16505552222"
                address: "+16505551111"
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
