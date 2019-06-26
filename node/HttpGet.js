var request = require('request');
var theRequestUrl = 'https://sdvye.com/bRDRDgOpyA';
console.log('+ URL request: ' + theRequestUrl);
request({method: "GET", url: theRequestUrl},
        function (error, response, body) {
            console.log(body);
        });

// eof