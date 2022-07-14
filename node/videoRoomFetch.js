console.log("+++ Fetch a video room's information.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// client.video.rooms('this3')
client.video.rooms('RM10195559d74bd277eeae46b7e054f8de')
    .fetch()
    .then(
    room => console.log(room)
    ).catch(error => console.error(error));

