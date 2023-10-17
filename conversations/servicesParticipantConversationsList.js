console.log("++ List a Twilio Conversation participant's conversations.");
// https://www.twilio.com/docs/conversations/api/participant-conversation-resource

// The following samples work. Which match the above parameters, which works.
// 
// curl -X GET "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B16505552222" \
// -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN
// 
// curl -X GET "https://conversations.twilio.com/v1/ParticipantConversations?Identity=dave%40example.com" \
// -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN
//
// Includes the service SID:
// curl -X GET "https://conversations.twilio.com/v1/Services/IS5c86b7d0d6e44133acb09734274f94f6/ParticipantConversations?Address=%2B16505552222" \
// -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN

var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6';       // Testing
//serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
console.log("+ Service SID:     " + serviceSid);

// Use one or the other: address or identity.
// addressPn = process.env.MY_PHONE_NUMBER;
// console.log("+ Participant address PN:      " + addressPn);
// identityString = "dave@example.com";
identityString = "dave";
console.log("+ Identity string: " + identityString);

// Also works with default conversation: 
//  client.conversations.v1.participantConversations
client.conversations.services(serviceSid).participantConversations
        // .list({address: addressPn, limit: 20})
        // .list({identity: identityString, limit: 20})
        .list({identity: identityString})
        .then(theConversations => theConversations.forEach(
                    aConversation => {
                        console.log(
                                "+ Service:" + aConversation.chatServiceSid
                                + " conversation:" + aConversation.conversationSid
                                + " state:" + aConversation.conversationState
                                + " FriendlyName: " + aConversation.conversationFriendlyName
                                + "\n+ participant: " + aConversation.participantSid
                                + " participantIdentity: " + aConversation.participantIdentity
                                );
                    }));

