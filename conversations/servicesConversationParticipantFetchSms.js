console.log("++ Given an SMS participant's address(mobile phone number), get the Conversation SID and proxy address(Twilio phone number) list.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline
participantAddress = '+16508668893';
console.log("+ Conversations service SID: " + serviceSid
        + "\n+ Participant Address:       " + participantAddress
        );
client.conversations.services(serviceSid).participantConversations
        .list({address: participantAddress, limit: 20})
        .then(participantConversations => participantConversations.forEach(p => {
                theUniqueName = "";
                if (p.conversationUniqueName !== null) {
                    theUniqueName = "\n+ conversationUniqueName:" + p.conversationUniqueName;
                }
                console.log(
                        "+ Type:" + p.participantMessagingBinding.type
                        + "\n+ State:                             " + p.conversationState
                        + "\n+ Conversation SID:                  " + p.conversationSid
                        + "\n+ conversationFriendlyName:          " + p.conversationFriendlyName
                        + "\n+ conversationCreatedBy:             " + p.conversationCreatedBy
                        + theUniqueName
                        + "\n+ Twilio phone number proxy address: " + p.participantMessagingBinding.proxy_address
                        );
            })
        ).catch(function (err) {
    console.error("- " + err);
    exit();
});

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
