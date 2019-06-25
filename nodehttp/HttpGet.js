var request = require('request');
var theRequestUrl = 'http://localhost:8000/hello.txt?p1=abc&p2=def';
console.log('+ URL request: ' + theRequestUrl);
request({method: "GET", url: theRequestUrl},
        function (error, response, body) {
            console.log(body);
        });

// eof