exports.handler = function(context, event, callback) {
  let AutopilotJSONresponse = { "actions": [ { say: "From Say Function. v2" } ] };
  callback(null, AutopilotJSONresponse);
  // callback(null, { "actions": [{ say: 'From Say Function. v1' }] });
};