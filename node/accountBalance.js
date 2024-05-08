console.log("++ Get Twilio account balance.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
require('dotenv').config();
client.balance.fetch()
  .then((data) => {
    console.log(`+ data.balance = ${data.balance}  ${data.currency}`);
    console.log(`+ Rounded      = ${Math.round(data.balance * 100) / 100}`);
  });