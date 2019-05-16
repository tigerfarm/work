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
const path = require('path');
const PORT = process.env.PORT || 8000;
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
app.use(express.static('docroot'));
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('HTTP Error 500.')
});
app.listen(PORT, function () {
    console.log('+ Listening on port: ' + PORT);
});
