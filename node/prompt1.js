// -----------------------------------------------------------------------------
console.log("+++ Start.");
// $ npm install prompt
var prompt = require('prompt');
// This json object is used to configure what data will be retrieved from command line.
var prompt_attributes = [
    { name: 'username', validator: /^[a-zA-Z\s\-]+$/,
      warning: 'Username is not valid, it can only contains letters, spaces, or dashes' },
    { name: 'password', hidden: true },
    { name: 'email', hidden: false }
];
prompt.start();
prompt.get(prompt_attributes, function (err, result) {
    if (err) {
        console.log(err);
        return 1;
    }else {
        console.log('Command-line received data:');
        var username = result.username;
        var password = result.password;
        var email = result.email;
        var message = "  Username : " + username + " , Password : " + password + " , Email : " + email;
        console.log(message);
    }
});

