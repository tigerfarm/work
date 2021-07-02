exports.handler = function(context, event, callback) {
 let response = new Twilio.Response();
  response.setStatusCode(200)
  response.appendHeader('Content-Type', 'application/json');
  response.setBody({object: 'test'})
  callback(null, response);
};