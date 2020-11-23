console.log("++ Notify to send an SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
client.notify
  .services('IS3a46cc3e6ca7a1b8bd7aea51c875d33a')
  .notifications.create({
    body: 'Knok-Knok! This is your first Notify SMS',
    toBinding: JSON.stringify({
      binding_type: 'sms',
      address: '+16505551111'
    })
  })
  .then(notification => console.log(notification.sid))
.done();

console.log("+ Sent.");
