var request = require('request');
exports.handler = function (context, event, callback) {
    let theUrl = "https://tigerfarmpress.com/hello.txt";
    console.log('+ theUrl: ' + theUrl);
    request(theUrl, function (error, response, theResponse) {
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
