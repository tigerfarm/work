const got = require('got');
exports.handler = function (context, event, callback) {
    console.log("+ Memory: " + event.Memory );
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