// -----------------------------------------------------------------------------
console.log("+++ List Services.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.chat.services(process.env.CHAT_SERVICE_SID)
        .update({
            'notifications.addedToChannel.enabled': true,
            'notifications.addedToChannel.sound': 'default',
            'notifications.addedToChannel.template': 'A New message in ${CHANNEL} from ${USER}: ${MESSAGE} test: ${abc}'
        })
        .then(service => console.log(
                    "+ Updated notify service SID: " + service.sid + " " + service.friendlyName
                    ));

// -----------------------------------------------------------------------------
