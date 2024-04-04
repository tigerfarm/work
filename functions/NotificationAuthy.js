// Twilio Function to send a message to the Authy app.
// Requires:
// + Getting an Authy API key.
//      https://www.twilio.com/docs/authy/twilioauth-sdk/quickstart/obtain-authy-api-key
// + Install the Authy app on your phone.
//      https://authy.com/download/
// + Add yourself to your Authy application.
// + Configure Twilio Function parameters: AUTHY_API_KEY and AUTHY_ID (Authy app user id).
// + Test.
//
exports.handler = function (context, event, callback) {
    let theMessage = event.Message || null;
    if (theMessage === null) {
        callback("- Error: Message parameter required.");
        return;
    }
    console.log('+ Message to push: ' + theMessage);
    //
    API_KEY = context.AUTHY_API_KEY;
    AuthyId = context.AUTHY_ID;
    theRequest = "https://api.authy.com/onetouch/json/users/" + AuthyId + "/approval_requests?api_key=" + API_KEY;
    console.log('+ theRequest: ' + theRequest);
    var theParameters = 'message=' + theMessage;
    var got = require('got');
    got.post(theRequest + "&" + theParameters,
            {body: "abc"}).then(
            function (response) {
                console.log(response.body);
                callback("+ Message pushed.")
            }).catch(function (error) {
        console.log(error);
        callback("- Error pushing message: " + error)
    });
};