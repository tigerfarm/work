// Work in progress, doesn't work, yet.

var request = require('request');
exports.handler = function (context, event, callback) {
    theMsg = event.msg || "Hello there";
    console.log("+ Send"
            + ", from: " + context.SENDGRID_EMAIL_FROM
            + ", to: " + "you@example.com"
            + ", MSG: " + theMsg);
    //
    // https://sendgrid.com/docs/API_Reference/Web_API/mail.html
    let theUrl = "https://api.sendgrid.com/api/mail.send.json";
    console.log('+ theUrl: ' + theUrl);
    //
    request({method: "POST", url: theUrl}, function (error, response, theResponse) {
        console.log('+ Run the request.');
        if (error) {
            console.log('- Error connecting.');
            callback(null, "error");
            return;
        }
        console.log('+ Response code: ' + response.statusCode + ', ' + theResponse);
        // The callback needs to be inside the request.
        callback(null, theResponse);
    });
};
