var request = require('request');
exports.handler = function (context, event, callback) {
    let sendfrom = event.sendfrom || context.SENDGRID_EMAIL_FROM;
    let sendto = event.sendto || context.SENDGRID_EMAIL_TO;
    let theMsg = event.msg || "Hello there 3";
    console.log("+ Send"
        + ", from: " + sendfrom
        + ", to: " + sendto
        + ", MSG: " + theMsg);
    var theFormData = {
        from: sendfrom,
        to: sendto,
        subject: "From a Twilio Function: 3",
        text: theMsg,
        api_user: sendfrom,
        api_key: context.SENDGRID_EMAIL_FROM_PASSWORD,
    };
    // https://sendgrid.com/docs/API_Reference/Web_API/mail.html
    let theUrl = "https://api.sendgrid.com/api/mail.send.json";
    console.log('+ theUrl: ' + theUrl);
    request({
        url: theUrl,
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        formData: theFormData
    }, function (error, response, theResponse) {
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
