console.log("+++ Start.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

client.video.rooms.create({uniqueName: 'this3'})
        .then(r => console.log(r.sid + " " + r.status + " " + r.uniqueName));

