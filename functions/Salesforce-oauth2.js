/*
    https://www.twilio.com/docs/salesforce/receiving-message-status-updates-twilio#create-a-twilio-function
 */
exports.handler = function(context, event, callback) {
    console.log("Log message.");
    var theRequest = "https://test.salesforce.com/services/oauth2/token";
    console.log('+ theRequest: ' + theRequest);
    got.post(theRequest, {
        body: {
            grant_type: 'password',
            client_id: clientId,
            client_secret: clientSecret,
            username: sfUserName,
            password: sfPassword
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        console.log("+ Salesforce response: " + response.body);
        callback("+ Message posted.");
    }).catch(function (error) {
        console.log(error);
        callback("- Error posting message : " + error);
    });
};