console.log("++ List Participants for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CH37648a8752b246c0ba74408564f7ac61";
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
                    if (p.messagingBinding.proxy_address !== undefined) {
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
