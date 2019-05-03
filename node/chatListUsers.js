console.log("++ Start.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var CHAT_SERVICE_SID = process.env.CHAT_SERVICE_SID;
function sayMessage(message) {
    console.log(message);
}
//
sayMessage("+ List users.");
var i = 1;
client.chat.services(CHAT_SERVICE_SID).users.list({limit: 30}).then(users => {
    users.forEach(user => {
        var theInfo = user.sid + " Role: " + user.roleSid + " " + user.identity;
        if (user.friendlyName !== null) {
            theInfo = theInfo + ", " + user.friendlyName;
        }
        if (user.isOnline !== null) {
            theInfo = theInfo + " isOnline: " + user.isOnline;
        }
        sayMessage("++ " + theInfo);
        // i ++;
        if ( i++ === users.length) {
            sayMessage("+ End of list.");
        }
    });
});

// eof
