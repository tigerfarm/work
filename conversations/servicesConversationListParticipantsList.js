console.log("++ List a service's conversations and its participants.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// https://www.twilio.com/docs/conversations/api/service-participant-resource
// 
// var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6';      // Testing
serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
console.log("+ Conversations for a Twilio Conversations service SID: " + serviceSid);
console.log("+ Conversation SID:                 Friendly Name");
//           CH3b5ec959d0684954a9dffc40c1f9d0f4
client.conversations.services(serviceSid).conversations.list({limit: 200})
        .then(conversations => conversations.forEach(c => {
                console.log(c.sid + "  " + c.friendlyName);
                // -------------------------------------------------------------
                // Process each participant each of the conversations.
                client.conversations.services(serviceSid).conversations(c.sid)
                        .participants
                        .list({limit: 20})
                        .then(participants => participants.forEach(p => {
                                theName = "";
                                if (JSON.parse(p.attributes).display_name !== undefined) {
                                    theName = "  " + JSON.parse(p.attributes).display_name;
                                }
                                if (p.identity !== null) {
                                    console.log(c.sid
                                            // + " " + c.friendlyName
                                            + " Participant SID: " + p.sid
                                            + " identity, Chat: " + p.identity
                                            + theName
                                            );
                                } else {
                                    // console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + JSON.parse(p.attributes).name);
                                    // {"avatar":"https://someassets-1403.twil.io/Keats.jpg","customer_id":"3","display_name":"John Keats"}
                                    // console.log("+ Participant SID: " + p.sid + " Messaging, SMS:  " + JSON.parse(p.attributes).display_name);
                                    console.log(c.sid
                                            // + " " + c.friendlyName
                                            + " Participant SID: " + p.sid
                                            + " Messaging: " + p.messagingBinding.type
                                            + ":" + p.messagingBinding.address
                                            + " proxy:" + p.messagingBinding.proxy_address
                                            + theName
                                            );
                                    // console.log("+ Participant SID: " + p.sid + " attributes:  " + p.attributes);
                                }
                            })
                        );
                // -------------------------------------------------------------

            }));
            