console.log("+++ List a conversation's message delivery information.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40"; // Default: tfpecho
messageSid = "IM62f30f1d99b64c909cf5627682998e7c";
console.log("+ Conversation SID: " + conversationSid);
console.log("+ Message SID: " + messageSid);

client.conversations.v1.conversations(conversationSid)
        .messages(messageSid)
        .deliveryReceipts
        .list({limit: 20})
        .then(deliveryReceipts => deliveryReceipts.forEach(d => {
                // console.log(d.sid);
                client.conversations.v1.conversations(conversationSid)
                        .messages(messageSid)
                        .deliveryReceipts(d.sid)
                        .fetch()
                        .then(delivery_receipt => {
                            console.log(
                            "++ " + delivery_receipt.sid
                            + " participant_sid:" + delivery_receipt.participanSid
                            + " channelMessageSid:" + delivery_receipt.channelMessageSid
                            + " status:" + delivery_receipt.status
                            );
                        });
            })
        );


