console.log("++ List serverless service environments.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID);

theService = 'ZS1ae4882e1b4a83fd3921eedce235d574';
console.log('+ theService: ' + theService);
client.serverless.v1.services(theService)
        .environments
        .list({limit: 20})
        .then(environments => environments.forEach(
                    e => console.log('+ Environment: ' + e.sid)
            ));


