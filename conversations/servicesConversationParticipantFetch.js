console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// particpant: Group MMS
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Default service
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
participantSid = 'MBee1e65a5777c46779e29cb48fd5a1643';      // MBee1e65a5777c46779e29cb48fd5a1643
//
// Frontline particpant: SMS
// serviceSid = 'IS186702e405b74452a449d67b9265669f';
// conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";
// participantSid = 'MB8f088d01ae9d4f109005bfd0871be755';
//
console.log("+ Conversation SID: " + conversationSid
        + " Participant SID: " + participantSid
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .fetch()
        .then(p => {
            if (p.identity !== null) {
                console.log("+ Participant SID: " + p.sid + " identity, Chat: " + p.identity);
            } else {
                theType = " Messaging type:" + p.messagingBinding.type;
                if (JSON.parse(p.attributes).display_name !== undefined) {
                    theName = " theName:" + JSON.parse(p.attributes).display_name;
                }
                theName = "";
                if (JSON.parse(p.attributes).display_name !== undefined) {
                    theName = " theName:" + JSON.parse(p.attributes).display_name;
                }
                theProxyAddress = "";
                if (p.messagingBinding.proxy_address !== null) {
                    theProxyAddress = " proxy_address:" + p.messagingBinding.proxy_address;
                } else {
                    theType = theType + "(Group MMS)";
                }
                theProjectedAddress = "";
                if (p.messagingBinding.projected_address !== null) {
                    theProjectedAddress = " projected_address:" + p.messagingBinding.projected_address;
                }
                console.log("+ Participant SID: " + p.sid
                        + theType
                        + " address:" + p.messagingBinding.address
                        + theProxyAddress
                        + theProjectedAddress
                        + theName
                        );
                console.log("+ attributes JSON:       " + JSON.stringify(p.attributes) );
                console.log("+ messagingBinding JSON: " + JSON.stringify(p.messagingBinding) );
            }
        })
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
