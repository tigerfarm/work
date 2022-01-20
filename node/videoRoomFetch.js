console.log("+++ Start.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

client.video.rooms('this3')
// client.video.rooms('RM80dd38cd5acc363053e26c10225d0ea6')
    .fetch()
    .then(
    room => console.log(room)
    ).catch(error => console.error(error));

