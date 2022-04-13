console.log("++ List conversation users.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// Doesn't work. ".list" is not an option.

client.frontlineApi.users.list({limit: 20})
        .then(users => users.forEach(user =>
                console.log(
                    "+ User SID: " + user.sid
                    + " " + user.identity
                    + " " + user.friendlyName
                        )));

                