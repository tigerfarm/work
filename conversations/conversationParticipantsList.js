console.log("++ List Participants for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40";
console.log("+ Conversation SID: " + conversationSid);
client.conversations.conversations(conversationSid)
        .participants
        .list({limit: 20})
        .then(participants => participants.forEach(p => {
                if (p.identity !== null) {
                    console.log("+ Participant SID: " + p.sid + ", Chat identity: " + p.identity);
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
                        theType = theType + "(Group MMS)";
                    }
                    theProjectedAddress = "";
                    if (p.messagingBinding.projected_address !== undefined) {
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
        );
