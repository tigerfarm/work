console.log("+++ List a video rooms.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// client.video.rooms.list()   // Default is status: in-progress or completed.
client.video.rooms.list({status: 'in-progress', limit: 20})
        .then(rooms => rooms.forEach(
                    r => console.log(r.sid + " " + r.status + " " + r.uniqueName)
            ).catch(error => console.error(error)));
