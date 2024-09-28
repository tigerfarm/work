// Asynchronous Programming: https://eloquentjavascript.net/11_async.html
// Overview: https://www.youtube.com/watch?v=8aGhZQkoFbQ

// -----------------------------------------------------------------------------
console.log("+ Before runProcess.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

const runProcess = async () => {
    try {
        console.log("++ During runProcess.");
    } catch (e) {
        return e;
    }
};

runProcess();
