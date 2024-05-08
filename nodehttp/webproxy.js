// -----------------------------------------------------------------------------
// $ npm install --save express
const express = require('express');
var app = express();

// $ npm install --save request
const request = require('request');
const url = require("url");

// var httpHost = "http://tigerfarmpress.com";
// var httpHost = "http://localhost:8080/";
var httpHost = "https://www.twilio.com";

// -----------------------------------------------------------------------------
// Echo the request.

var theUrl = '';
var theQueryJson = '';
app.get('*', function (theRequest, res, next) {
    console.log("------------------");
    theUrl = url.parse(theRequest.url).pathname;
    theQueryJson = url.parse(theRequest.url).query;
    var theQueryString = '';
    if (theQueryJson !== null) {
        theQueryString = " ? " + JSON.stringify(theQueryString);
    }
    var urlComponentMessage = '+ URL components : ' + theRequest.method + ' ' + theUrl + theQueryString;
    console.log(urlComponentMessage);

    console.log('+ URL request: ' + httpHost + theUrl);

    // request({method: "GET", url: "http://tigerfarmpress.com/hello.txt"},
    if (theUrl.endsWith(".jpg") || theUrl.endsWith(".png") || theUrl.endsWith(".ico")) {
        console.log('+ Graphic, no response: ' + theUrl);
        return;
    }
    if (!theUrl.endsWith(".html")) {
        console.log('+ Limit to HTML: ' + theUrl);
        return;
    }
    if (theUrl.endsWith(".js")) {
        res.header('Content-Type', 'text/javascript');
        console.log('+ javascript: ' + theUrl);
    } else if (theUrl.endsWith(".html")) {
        res.header('Content-Type', 'text/html');
        console.log('+ html: ' + theUrl);
    } else if (theUrl.endsWith(".css")) {
        res.header('Content-Type', 'text/css');
        console.log('+ css: ' + theUrl);
    } else if (theUrl.endsWith(".xml")) {
        res.header('Content-Type', 'text/xml');
        console.log('+ xml: ' + theUrl);
    } else {
        res.header('Content-Type', 'text/plain');
        console.log('+ plain: ' + theUrl);
    }

    request({method: "GET", url: httpHost + theUrl},
            function (error, response, body) {
                // console.log(body);
                res.send(body);
            });
});

// -----------------------------------------------------------------------------
app.get('/hello', function (req, res) {
    if (req.query.username) {
        res.send('Hello ' + req.query.username + '.');
    } else {
        res.send('GET: Hello there.');
    }
});
app.post('/', function (req, res) {
    if (req.body.username) {
        res.send('Hello ' + req.body.username + '.');
    } else {
        res.send('POST: Hello there.');
    }
});


// -----------------------------------------------------------------------------
app.use(express.static('docroot'));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('HTTP Error 500.');
});

// const path = require('path');
// export PORT=8080
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log('+ Listening on port: ' + PORT);
});
