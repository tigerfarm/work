exports.handler = function (context, event, callback) {
    console.log('Redirect to another Studio flow.');
    let twiml = new Twilio.twiml.VoiceResponse();
    // The URL needs work.
    twiml.redirect('https://twilio-account-sid:twilio-account-auth-token@studio.twilio.com/v1/Flows/FW7ea...c9/Executions?From=me&To=you');
    callback(null, twiml);
};