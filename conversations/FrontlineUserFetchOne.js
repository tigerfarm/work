console.log("++ List conversation user information.");
// Example output:
// ++ List conversation user information.
// + User SID: UScf...17d dave@gexample.com Stacy David

var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

client.frontlineApi.users('UScf92bef0fa0d4e528f6db38b1a32c17d')
        .fetch()
        .then(user =>
            console.log(
                    "+ User SID: " + user.sid
                    + " " + user.identity
                    + " " + user.friendlyName
                    )
        );