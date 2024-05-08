exports.handler = function(context, event, callback) {
    let theJson = JSON.stringify(event);
    console.log("+ JSON: " + theJson);
    const answer = event.CurrentInput;
    console.log("+ answer: " + answer );
    let AutopilotJSONresponse = { "actions": [ { say: "Autopilot Say the name: " + answer } ] };
    callback(null, AutopilotJSONresponse);
};
