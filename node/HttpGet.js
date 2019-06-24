var request = require('request');
var theRequestUrl = 'https://tigerfarmpress.com/hello.txt';
console.log('+ URL request: ' + theRequestUrl);
request({method: "GET", url: theRequestUrl},
        function (error, response, body) {
            console.log(body);
        });

// eof