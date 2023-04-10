console.log("+++ List a conversation's message delivery information.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
// conversationSid = "CH183bde74b2314d2faef9a1c757b8f028";
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
//
messageSid = "IM67eae4b30c6e4800a2387c53d04eb44f";
console.log("+ Conversation message SID: " + messageSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .messages(messageSid)
        .deliveryReceipts
        .list({limit: 20})
        .then(deliveryReceipts => deliveryReceipts.forEach(d => {
                // console.log(d.sid);
                client.conversations.services(serviceSid).conversations(conversationSid)
                        .messages(messageSid)
                        .deliveryReceipts(d.sid)
                        .fetch()
                        .then(delivery_receipt => {
                            console.log(
                                    "++ " + delivery_receipt.sid
                                    + " participant_sid:" + delivery_receipt.participantSid
                                    + " channelMessageSid:" + delivery_receipt.channelMessageSid
                                    + " status:" + delivery_receipt.status
                                    );
                        })
                        .catch(function (err) {
                            console.error("- " + err);
                        });
            })
        );


