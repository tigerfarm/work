var request = require('request');
var basicAuth = "Basic " + Buffer.from("dave" + ":" + "password").toString("base64");

// To echo the form data, the URI needs to have a value such as "/show".

// var theRequestUrl = "http://localhost:3000/2010-04-01/Accounts/123456/Messages." + "json";
// var theRequestUrl = 'http://localhost:3000/post';
var theRequestUrl = 'https://tfpecho.herokuapp.com/post';
var theFormData = {
    From: "+16505551111",
    To: "+16505552222",
    Body: 'Twilio support'
};
console.log('------------------------------------------------');
console.log('+ basicAuth:   ' + basicAuth);
console.log('+ URL request: ' + theRequestUrl);
console.log('+ theFormData: ' + JSON.stringify(theFormData));
console.log('------------------------------------------------');
request({
    method: "POST",
    headers: {
        "Authorization": basicAuth,
        "Content-Type": "application/x-www-form-urlencoded"
        //, "Chunked": "false"
    },
    url: theRequestUrl,
    formData: theFormData
}, function (error, response, body) {
    console.log(body);
});

// Note, "%20" decoded is a space " ".
// curl -X POST http://localhost:3000/post \
//    -d 'Identity=davea' \
//    -d 'Body=Hello%2017' \
//    -u dave:password
    
// eof