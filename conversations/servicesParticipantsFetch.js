console.log("++ List participant from a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
conversationSid = "CHaa8df2fcdcde42f4ba401249bd19b889";
participantSid = 'MBf3a08408f8184d88bf03d050e806d3e7';
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .fetch()
        .then(participant => {
            theName = "";
            if (JSON.parse(participant.attributes).display_name !== undefined) {
                theName = "  " + JSON.parse(participant.attributes).display_name;
            }
            if (participant.identity !== null) {
                // + Participant SID: MBf494fc53a1444dc983319d37fc70fe1b identity, Chat: dave
                console.log("+ Participant SID: " + participant.sid
                        + " identity, Chat: " + participant.identity
                        + theName
                        );
            } else {
                // + Participant SID: MBf8a48f0dd6f644a489156c65cba79adb Messaging: sms:  +16505552222:  +12095551111
                console.log("+ Participant SID: " + participant.sid
                        + " Messaging: " + participant.messagingBinding.type
                        + ":  " + participant.messagingBinding.address
                        + ":  " + participant.messagingBinding.proxy_address
                        + theName
                        );
                // console.log("+ Participant SID: " + p.sid + " attributes:  " + p.attributes);
            }
        });
