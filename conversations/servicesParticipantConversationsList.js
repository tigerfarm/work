console.log("++ List a participant's conversations.");
// https://www.twilio.com/docs/conversations/api/participant-conversation-resource
// https://www.twilio.com/docs/conversations/api/service-participant-conversation-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
//serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6';       // Testing
serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
console.log("+ Conversations service SID:   " + serviceSid);
addressPn = process.env.MY_PHONE_NUMBER;
console.log("+ Participant address PN:      " + addressPn);
identityString = "dave@example.com";
console.log("+ Participant identity string: " + identityString);

// The following 2 samples work. Which match the above parameters, which works.
// 
// curl -X GET "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B16505552222" \
// -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN
// 
// curl -X GET "https://conversations.twilio.com/v1/ParticipantConversations?Identity=dave%40example.com" \
// -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN
//
// curl -X GET "https://conversations.twilio.com/v1/Services/IS5c86b7d0d6e44133acb09734274f94f6/ParticipantConversations?Address=%2B16505552222" \
// -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN


// Also works: client.conversations.v1.participantConversations
client.conversations.services(serviceSid).participantConversations
        .list({address: addressPn, limit: 20})
        // .list({identity: identityString, limit: 20})
        .then(participantConversations => participantConversations.forEach(
                    participant => console.log(
                    "+ chatServiceSid:" + participant.chatServiceSid
                    + " conversationSid:" + participant.conversationSid
                    + " participantSid:" + participant.participantSid
                    + " participantIdentity:" + participant.participantIdentity
                    + " conversationFriendlyName:" + participant.conversationFriendlyName
                    )
            ));

