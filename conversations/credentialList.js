console.log("++ List credentials.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
client.conversations.v1.credentials
        .list({limit: 20})
        .then(credentials => credentials.forEach(c => {
                console.log(
                        "+ Credentials SID: " + c.sid
                        + " Type: " + c.type
                        + ", Friendly name: " + c.friendlyName
                        );
            }))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });
