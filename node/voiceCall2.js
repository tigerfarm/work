var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
client.calls.create({
    url: "https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4",
    from: "abc",
    to: "client:david"
}).then(call => console.log("+ SID: " + call.sid));
