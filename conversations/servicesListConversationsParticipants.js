console.log("+ List Services, their conversations and the conversation's participants.");
console.log("+ Report data: Conversations Service: IS... Conversation: CH... Participant: MB...");
// https://www.twilio.com/docs/conversations/api/service-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

client.conversations.services.list({limit: 20})
        .then(services => services.forEach(s => {
                // console.log("+ Conversations for a Twilio Conversations service SID: " + s.sid);
                client.conversations.services(s.sid).conversations.list({limit: 200})
                        .then(conversations => conversations.forEach(c => {
                                //
                                // Don't list conversations that do not have participants.
                                // console.log("+ Conversation SID: " + c.sid + " " + c.friendlyName);
                                //
                                // -------------------------------------------------------------
                                // Process each participant each of the conversations.
                                client.conversations.services(s.sid).conversations(c.sid)
                                        .participants
                                        .list({limit: 20})
                                        .then(participants => participants.forEach(p => {
                                                if (p.identity !== null) {
                                                    // Chat participants.
                                                    console.log(
                                                            "++ Service: " + s.sid
                                                            + " Conversation: " + c.sid
                                                            + " state:" + c.state
                                                            + " Participant SID: " + p.sid
                                                            + " identity, Chat: " + p.identity
                                                            + " " + c.friendlyName);
                                                    /*
                                                     */
                                                } else {
                                                    // SMS or WhatsApp participants.
                                                    // 
                                                    // console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + JSON.parse(p.attributes).name);
                                                    // {"avatar":"https://someassets-1403.twil.io/Keats.jpg","customer_id":"3","display_name":"John Keats"}
                                                    // console.log("+ Participant SID: " + p.sid + " Messaging, SMS:  " + JSON.parse(p.attributes).display_name);
                                                    theName = "";
                                                    if (JSON.parse(p.attributes).display_name !== undefined) {
                                                        theName = "  " + JSON.parse(p.attributes).display_name;
                                                    }
                                                    console.log(
                                                            "++ " + s.sid
                                                            + " " + c.sid
                                                            + " " + p.sid
                                                            + " Messaging: " + p.messagingBinding.type
                                                            + ":" + p.messagingBinding.address
                                                            + " proxy:" + p.messagingBinding.proxy_address
                                                            + theName
                                                            + " " + c.friendlyName
                                                            );
                                                    // console.log("+ Participant SID: " + p.sid + " attributes:  " + p.attributes);
                                                    // Frontline user data is stored in the attributes.
                                                }
                                            })
                                        );
                                // -------------------------------------------------------------

                            }));
            }));
