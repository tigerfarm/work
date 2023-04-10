console.log("++ List Conversation participants.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Conversations SID/friendlyName/uniqueName/createdBy");
var conversationSid = "";
client.conversations.conversations.list({limit: 20})
        .then(conversations => conversations.forEach(c => {
                client.conversations.conversations(c.sid)
                        .participants
                        .list({limit: 20})
                        .then(participants => participants.forEach(p => {
                                if (p.identity !== null) {
                                    console.log("+ Conversation SID: " + c.sid
                                            + " Participant SID: " + p.sid
                                            + ", Chat identity: " + p.identity
                                            );
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
                                    console.log("+ Conversation SID: " + c.sid
                                            + " Participant SID: " + p.sid + ","
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
            })
        );
