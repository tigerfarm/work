// -----------------------------------------------------------------------------
console.log("+++ Update a Service.");

const accountSid = process.env.MASTER_ACCOUNT_SID;
const authToken = process.env.MASTER_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.notify.services('IS285725e217895f21b6bf0c1546c81f14')
        .update({
            friendlyName: 'p1serviceB',
            deliveryCallbackUrl: 'http://www.tigerfarmpress.com/echo',
            deliveryCallbackEnabled: true
        })
        .then(service => console.log(
                    "+ Updated: " + service.sid
                    + " " + service.friendlyName
                    + " " + service.deliveryCallbackUrl
                    + " " + service.deliveryCallbackEnabled
                    ));

// -----------------------------------------------------------------------------
