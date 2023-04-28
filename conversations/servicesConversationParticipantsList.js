console.log("++ List Participants for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
// conversationSid = "CHf0220442f8974f559ba663c660f0bcea";  // Frontline
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";  // abc
// conversationSid = "CH3b88e37c89ce4e39955dd734364c5a78";
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .list({limit: 20})
        .then(participants => participants.forEach(p => {
                if (p.identity !== null) {
                    // + Participant SID: MBf494fc53a1444dc983319d37fc70fe1b identity, Chat: dave
                    console.log("+ Participant SID: " + p.sid + " identity, Chat: " + p.identity);
                } else {
                    // + Participant SID: MBf8a48f0dd6f644a489156c65cba79adb Messaging: sms:  +16504837603:  +12093308688
                    // 
                    // console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + JSON.parse(p.attributes).name);
                    // {"avatar":"https://abouttime-2357.twil.io/Keats.jpg","customer_id":"3","display_name":"John Keats"}
                    // console.log("+ Participant SID: " + p.sid + " Messaging, SMS:  " + JSON.parse(p.attributes).display_name);
                    theName = "";
                    if (JSON.parse(p.attributes).display_name !== undefined) {
                        theName = "  " + JSON.parse(p.attributes).display_name;
                    }
                    console.log("+ Participant SID: " + p.sid
                            + " Messaging: " + p.messagingBinding.type
                            + ":  " + p.messagingBinding.address
                            + ":  " + p.messagingBinding.proxy_address
                            + theName
                            );
                    // console.log("+ Participant SID: " + p.sid + " attributes:  " + p.attributes);
                }
            })
        );
