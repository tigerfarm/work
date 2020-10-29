const got = require('got');
exports.handler = function (context, event, callback) {
    console.log("+ Memory: " + event.Memory );
    // + Memory: {"twilio":{"chat":
    // {"ChannelSid":"CH0607e9cd21374d0cab8484ee5fc650ea","AssistantName":"","Attributes":{},"ServiceSid":"IS36b7df8c2ba5484c9189b7eb647f259d","Index":39,"From":"user","MessageSid":"IM950f22ca27dd43d68c9a5d89bdce2205"},
    // "collected_data":{
    // "convert_currencies":{
    // "answers":{
    // "cur_from":{"confirm_attempts":0,"answer":"cn","filled":true,"type":"Twilio.CURRENCY","confirmed":false,"validate_attempts":1,"attempts":1},
    // "cur_to":{"answer":"us","type":"Twilio.CURRENCY","filled":true,"at...
  const answers = JSON.parse(event.Memory).twilio.collected_data.convert_currencies.answers;
  const cur_from = answers.cur_from.answer.toUpperCase();
  const cur_to = answers.cur_to.answer.toUpperCase();
  got(`https://api.ratesapi.io/api/latest?symbols=${cur_to}&base=${cur_from}`,
    { json: true }).then(response => {
      const rate = response.body.rates[cur_to];
      callback(null, {
        "actions": [
          { say: `The current conversion rate from ${cur_from} to ${cur_to} is ${rate.toFixed(2)}.` }
        ]
      });
    }).catch(error => {
      callback(null, {
        "actions": [
          { say: `Sorry, a problem occurred: ${error.response.body.error}` }
        ]
      });
    });
};