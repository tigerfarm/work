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
// -----------------------------------------------------------------------------
// $ npm install express --save
const express = require('express');
var app = express();

// -----------------------------------------------------------------------------
app.use(express.static('docroot'));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('HTTP Error 500.');
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// -----------------------------------------------------------------------------
function sayMessage(message) {
    console.log(message);
}

var request = require('request');
function requestPost(theUrl, res) {
    sayMessage("+ POST theUrl :" + theUrl + ":");
    sayMessage("+ api_key :" + process.env.AUTHY_API_KEY_TF + ":");
    sayMessage("+ authy_id :" + process.env.AUTHY_ID + ":");
    let options = {
        url: theUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            api_key: process.env.AUTHY_API_KEY_TF,
            authy_id: process.env.AUTHY_ID
        }
    };
    request.post(options, function (error, response, theResponse) {
        if (error) {
            // Print the error if one occurred
            sayMessage('- Error connecting.');
            return;
        }
        if (!response.statusCode.toString().startsWith('2')) {
            var errorMessage = '';
            if (response.statusCode.toString().startsWith('1')) {
                errorMessage = ": Informational.";
            } else if (response.toString().startsWith('3')) {
                errorMessage = ": Redirectory.";
            } else if (response.statusCode === 400) {
                errorMessage = ": Bad request.";
            } else if (response.statusCode === 401) {
                errorMessage = ": Unauthorized.";
            } else if (response.statusCode === 403) {
                errorMessage = ": Forbidden.";
            } else if (response.statusCode === 404) {
                errorMessage = ": Not found.";
            } else if (response.toString().startsWith('4')) {
                errorMessage = ": Client error.";
            } else if (response.toString().startsWith('5')) {
                errorMessage = ": Server Error.";
            }
            sayMessage('- Status code: ' + response.statusCode + errorMessage + ' ' + theUrl);
            return;
        }
        sayMessage('+ Response code: ' + response.statusCode + ', URL: ' + theUrl);
        sayMessage(response.headers);
        sayMessage('');
        sayMessage(theResponse);
        res.send(theResponse);
    });
}

// -----------------------------------------------------------------------------
app.get('/registration', function (req, res) {
    res.send('Must use POST.');
});
app.post('/registration', function (req, res) {
    sayMessage('+ req.body :' + req.body + ':');
    // return;
    var returnString = '';
    if (req.body.api_key) {
        returnString = '+ Data: ' + req.body.api_key;
        if (req.body.authy_id) {
            returnString = returnString + ' ' + req.body.authy_id + '.';
        } else {
            res.send('- Require: api_key.');
            return;
        }
    } else {
        res.send('- Require: authy_id.');
        return;
    }
    var theUrl = 'https://api.authy.com/protected/json/sdk/registrations';
    sayMessage('+ POST request to: ' + theUrl);
    requestPost(theUrl, res);
});

const PORT = process.env.PORT || 8000;
console.log('+ PORT: ' + PORT);
app.listen(PORT, function () {
    console.log('+ Listening on port: ' + PORT);
});

// -----------------------------------------------------------------------------
