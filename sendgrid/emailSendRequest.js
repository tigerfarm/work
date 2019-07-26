// https://sendgrid.com/docs/API_Reference/Web_API/mail.html
// Optional: toname=David
//
var request = require('request');

sendfrom = process.env.EMAIL_TF;
sendto = process.env.EMAIL_DT;
theMsg = "Hello there 2";
console.log("+ Send"
        + ", from: " + sendfrom
        + ", to: " + sendto
        + ", MSG: " + theMsg);
var theFormData = {
    from: sendfrom,
    to: sendto,
    subject: "From a node program: 2",
    text: theMsg,
    api_user: sendfrom,
    api_key: process.env.EMAIL_TF_PASSWORD,
};

let theUrl = "https://api.sendgrid.com/api/mail.send.json";
console.log('+ theUrl: ' + theUrl);
//
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
        // callback(null, "error");
        return;
    }
    console.log('+ Response code: ' + response.statusCode + ', ' + theResponse);
    // The callback needs to be inside the request.
    // callback(null, theResponse);
});
