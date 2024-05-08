exports.handler = function(context, event, callback) {
  let response = "+ Twilio Connect AccountSid: " + event.AccountSid;
  callback(null, response);
};