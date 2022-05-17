console.log("++ Given an SMS participant's address(mobile phone number), get the Conversation SID and proxy address(Twilio phone number) list.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// particpant: Group MMS
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// participantAddress = '+16504837603';
//
// Frontline
serviceSid = 'IS186702e405b74452a449d67b9265669f';
participantAddress = '+16508668893';
//
console.log("+ Conversations service SID:           " + serviceSid
        + "\n+ Participant message binding address: " + participantAddress
        );
client.conversations.services(serviceSid).participantConversations
        .list({address: participantAddress, limit: 20})
        .then(participantConversations => participantConversations.forEach(p => {
                theUniqueName = "";
                if (p.conversationUniqueName !== null) {
                    theUniqueName = "\n+ conversationUniqueName:            " + p.conversationUniqueName;
                }
                console.log(
                        "+ Participant Type:                  " + p.participantMessagingBinding.type
                        + "\n+ participantSid:                    " + p.participantSid
                        + "\n+ Conversation State:                " + p.conversationState
                        + "\n+ Conversation DateCreated:          " + p.conversationDateCreated
                        + "\n+ Conversation SID:                  " + p.conversationSid
                        + theUniqueName
                        + "\n+ conversationFriendlyName:          " + p.conversationFriendlyName
                        + "\n+ conversationCreatedBy:             " + p.conversationCreatedBy
                        + "\n+ Twilio phone number proxy address: " + p.participantMessagingBinding.proxy_address
                        );
                // console.log("+ p: " + JSON.stringify(p) );
            })
        ).catch(function (err) {
    console.error("- " + err);
    exit();
});

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
