console.log("++ Check usage record categories.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
// Tested: calls-inbound sms-inbound channels-whatsapp-inbound channels-whatsapp-outbound channels-messaging-inbound channels-messaging-outbound
// Fails: sms-inboundx
client.usage.records
        .list({
            category: 'channels-messaging-inbound',     // Note, a list does not work.
            limit: 20
        })
        .then(records => records.forEach(
                    r => console.log("+ category: " + r.category 
                    + " asOf: " + r.asOf 
                    + " count: " + r.count
                    + ", price: " + r.price
                    )
            ));
