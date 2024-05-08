// From:
//  https://github.com/heroku/node-js-getting-started
//  https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment
// Sample:
//  https://github.com/expressjs/express/blob/master/examples/auth/index.js
//  
// To do:
//  Sample using: setHeaders
//

// -----------------------------------------------------------------------------
// $ npm install express --save
const express = require('express');
var app = express();

// -----------------------------------------------------------------------------
app.get('/hello', function (req, res) {
    if (req.query.username) {
        res.send('Hello ' + req.query.username + '.');
    } else {
        res.send('Hello there.');
    }
});
app.post('/', function (req, res) {
    if (req.body.username) {
        res.send('Hello ' + req.body.username + '.');
    } else {
        res.send('Hello there.');
    }
});
// --------------------------------------
app.get('/redirect', function (req, res) {
    res.redirect('/redirected');
});
app.get('/redirected', function (req, res) {
    res.send('redirected.');
});

// -----------------------------------------------------------------------------
app.get('/show', function (req, res) {
    console.log("+ GET headers: " + JSON.stringify(req.headers));
    res.send('show get.');
});

app.use(express.urlencoded());
app.post('/show', function (req, res) {
    console.log("+ POST headers: " + JSON.stringify(req.headers));
    console.log("+ POST body: " + JSON.stringify(req.body));

    var data = '';
    req.on('data', function (chunk) {
        console.log('Received data:', chunk.toString());
        data += chunk.toString();
    });
    req.on('end', function () {
        console.log('Complete data:', data);
    });

    res.send('show post.');
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
