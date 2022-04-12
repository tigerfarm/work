console.log("++ List a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline

client.conversations.services(serviceSid).conversations.list({limit: 200})
        .then(conversations => conversations.forEach(c => {
                console.log("+ Conversation SID: " + c.sid + " " + c.friendlyName);
                client.conversations.services(serviceSid).conversations(c.sid)
                        .participants
                        .list({limit: 20})
                        .then(participants => participants.forEach(p => {
                                if (p.identity !== null) {
                                    console.log("+ Conversation SID: " + c.sid
                                            + " " + c.friendlyName
                                            + " Participant SID: " + p.sid
                                            + " identity, Chat: " + p.identity);
                                } else {
                                    // console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + JSON.parse(p.attributes).name);
                                    // {"avatar":"https://someassets-1403.twil.io/Keats.jpg","customer_id":"3","display_name":"John Keats"}
                                    // console.log("+ Participant SID: " + p.sid + " Messaging, SMS:  " + JSON.parse(p.attributes).display_name);
                                    theName = "";
                                    if (JSON.parse(p.attributes).display_name !== undefined) {
                                        theName = "  " + JSON.parse(p.attributes).display_name;
                                    }
                                    console.log("+ Conversation SID: " + c.sid
                                            + " " + c.friendlyName
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
            }));