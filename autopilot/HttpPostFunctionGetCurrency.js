var request = require('request');
// var basicAuth = "Basic " + new Buffer(process.env.ACCOUNT_SID + ":" + process.env.AUTH_TOKEN).toString("base64");
var theRequestUrl = "https://obedient-machine-3163.twil.io/currency";
var theFormData = {"Memory":'{"twilio":{"collected_data":{"convert_currencies":{"answers":{"cur_from":{"answer":"USD"},"cur_to":{"answer":"CAD"}}}}}}'};
console.log('+ URL request: ' + theRequestUrl + " : " + JSON.stringify(theFormData));
request({
    method: "POST",
    url: theRequestUrl,
    json: theFormData
}, function (error, response, body) {
    // + Response: {"statusCode":200,"body":{"actions":[{"say":"The current conversion rate from USD to CAD is 1.33."}]} ...
    console.log("+ Status Code: " + JSON.stringify(response.statusCode));
    console.log("+ Actions:     " + JSON.stringify(response.body.actions));
    console.log("+ response:    " + JSON.stringify(response));
});

// eof