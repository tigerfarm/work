console.log("+++ Start.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

client.video.rooms.list({status: 'completed', limit: 20})
                  .then(rooms => rooms.forEach(
                  r => console.log(r.sid)
                  ));
