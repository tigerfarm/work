exports.handler = function(context, event, callback) {
    console.log("=====================================");
    console.log("++ Print event JSON.");
    console.log("------");
    console.log(event);
    console.log("-------------------------------------");
    console.log("++ Header attribute values.");
    console.log("------");
    console.log("+ Header, host: " + event.request.headers['host']);
    console.log("+ Headers: " + JSON.stringify(event.request.headers));
    console.log("------");
    for (let key in event.request.headers) {
        console.log("+ event keys: " + `${key}: ${event.request.headers[key]}`);
        if (key === 'user-agent') {
            state = event.request.headers[key];
            console.log('+++ Found match for event header, user-agent: ' + state);
        }
    }
    console.log("-------------------------------------");
    console.log("++ HTTP parameters.");
    console.log("------");
    console.log("+ event.f1: " + event.f1);
    console.log("------");
    for (let key in event) {
        console.log("+ event keys: " + `${key}: ${event[key]}`);
        if (key === 'f1') {
            state = event[key];
            console.log('+++ Found match for event HTTP parameter, f1: ' + state);
        }
    }
    console.log("-------------------------------------");
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('Hello from this function.');
    callback(null, twiml);
    // callback(null, 'Hello from cSip.');
};