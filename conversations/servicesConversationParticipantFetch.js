console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// particpant: Group MMS
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Default service
// conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
// participantSid = 'MBee1e65a5777c46779e29cb48fd5a1643';      // MBee1e65a5777c46779e29cb48fd5a1643
//
// Frontline particpant: SMS
// serviceSid = 'IS186702e405b74452a449d67b9265669f';
// conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";
// participantSid = 'MB8f088d01ae9d4f109005bfd0871be755';
//
serviceSid = "IS5c86b7d0d6e44133acb09734274f94f6";          // testing
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";     // abc
// participantSid = 'MBf494fc53a1444dc983319d37fc70fe1b';      // Dave
participantSid = 'MBf8a48f0dd6f644a489156c65cba79adb';      // SMS participante

console.log("+ Conversation SID: " + conversationSid
        + " Participant SID: " + participantSid
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .fetch()
        .then(p => {
            if (p.identity !== null) {
                console.log("+ Participant SID: " + p.sid + ", Chat identity: " + p.identity);
                console.log("+ Participant lastReadMessageIndex: " + p.lastReadMessageIndex);
            } else {
                theType = " Messaging type:" + p.messagingBinding.type;
                if (JSON.parse(p.attributes).display_name !== undefined) {
                    theName = " display_name:" + JSON.parse(p.attributes).display_name;
                }
                theName = "";
                if (JSON.parse(p.attributes).display_name !== undefined) {
                    theName = " display_name:" + JSON.parse(p.attributes).display_name;
                }
                theProxyAddress = "";
                if (p.messagingBinding.proxy_address !== null) {
                    theProxyAddress = " proxy_address:" + p.messagingBinding.proxy_address;
                } else {
                    // No proxy_address, which is a Twilio phone number.
                    theType = theType + "(Group MMS)";
                }
                theProjectedAddress = "";
                if (p.messagingBinding.projected_address !== undefined && p.messagingBinding.projected_address !== null) {
                    // Chat participant in a Group MMS conversation, has a projected_address.
                    theProjectedAddress = " projected_address:" + p.messagingBinding.projected_address;
                }
                console.log("+ Participant SID: " + p.sid + ","
                        + theType
                        + theName
                        + " address:" + p.messagingBinding.address
                        + theProxyAddress
                        + theProjectedAddress
                        );
                // console.log("+ messagingBinding JSON: " + JSON.stringify(p.messagingBinding));
            }
            // console.log("+ attributes JSON:       " + JSON.stringify(p.attributes));
        })
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
