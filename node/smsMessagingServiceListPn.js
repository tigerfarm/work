// twilio api:core:messages:fetch --sid SM2feb3243087344fcae1652e603fa5462

console.log("++ Fetch SMS message log information.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
console.log("+ Account SID: " + process.env.ACCOUNT_SID);
client.messaging.v1.services
        .each(ms => {
            let theSid = ms.sid;
            client.messaging.v1.services(theSid)
                    .phoneNumbers
                    .each(pn => {
                        console.log(
                                "+ Message SID: " + theSid
                                , '++ phoneNumber: ' + pn.phoneNumber
                                // , '\n++ links phone numbers: ' + ms.links.phone_numbers
                                // , '\n++ links: ' + JSON.stringify(ms.links)
                                );
                    });

        });
           