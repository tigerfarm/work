// -----------------------------------------------------------------------------
console.log("+ Start, version: 1.0");

// $ npm install --save express
const express = require('express');
var app = express();

// -----------------------------------------------------------------------------
/**
 * https://www.npmjs.com/package/raw-body
var getRawBody = require('raw-body')
app.use(function (req, res, next) {
    getRawBody(req, {
        length: req.headers['content-length'],
        limit: '1mb',
        encoding: contentType.parse(req).parameters.charset
    }, function (err, string) {
        if (err)
            return next(err);
        req.text = string;
        next();
    });
});
**/

// -----------------------------------------------------------------------------
app.use(
        express.json({
            verify: (req, res, buf) => {
                req.rawBody = buf.toString();
            }
        })
        );

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log('+ Listening on port: ' + PORT);
});