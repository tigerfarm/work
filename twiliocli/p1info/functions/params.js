exports.handler = function(context, event, callback) {
    console.log("=====================================");
    // Prints event JSON.
    console.log(event);
    console.log("-------------------------------------");
    // Header attribute values
    console.log("+ Header, host: " + event.request.headers['host']);
    console.log("+ Headers: " + JSON.stringify(event.request.headers));
    console.log("------");
    for (let key in event.request.headers) {
        console.log("+ event keys: " + `${key}: ${event.request.headers[key]}`);
        if (key === 'run') {
            state = event[key];
            console.log('+ event keys, run: ' + state);
        }
    }
    console.log("-------------------------------------");
    // HTTP parameters
    console.log("+ event.run: " + event.f1);
    console.log("------");
    for (let key in event) {
        console.log("+ event keys: " + `${key}: ${event[key]}`);
        if (key === 'f1') {
            state = event[key];
            console.log('+ event keys, run: ' + state);
        }
    }
    console.log("-------------------------------------");
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('Hello from cSip.');
    callback(null, twiml);
    // callback(null, 'Hello from cSip.');
};