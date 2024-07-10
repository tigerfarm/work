var request = require('request');
// var theRequestUrl = "https://tfpbooks.herokuapp.com/echo";
// var theRequestUrl = "http://localhost:8080/echo";
var theRequestUrl = "https://statuscallback-8821.twil.io/echoRequest?a=b2";
var theFormData = {
    From: process.env.MAIN_PN_8003,
    To: process.env.MY_PHONE_NUMBER,
    Body: 'Twilio support 1'
};
console.log('+ URL request: ' + theRequestUrl + " : " + JSON.stringify(theFormData));
request({
    method: "POST",
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    url: theRequestUrl,
    formData: theFormData
}, function (error, response, body) {
    console.log(body);
});

// eof