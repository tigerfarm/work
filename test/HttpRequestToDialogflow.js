// Documenation: https://github.com/googleapis/nodejs-dialogflow
// Samples:
//  https://github.com/googleapis/nodejs-dialogflow/blob/master/samples/detect.js
//  https://medium.com/@tzahi/how-to-setup-dialogflow-v2-authentication-programmatically-with-node-js-b37fa4815d89
exports.handler = function (context, event, callback) {
    console.log("Hello");
    console.log('Event: ' + JSON.stringify(event));
    var status;
    var got = require('got');
    var requestPayload = {
        "queryInput": {
            "text": {
                "text": event.speech_results,
                "languageCode": "en-US"
            }
        }
    };
    got.post('https://dialogflow.googleapis.com/...',
            {headers: {
                    'authorization': "Bearer " + content.GOOGLE_API_KEY,
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                json: true,
                body: JSON.stringify(requestPayload)
            }).then(function (response) {
        if (response.body.queryResult.allRequiredParamsCollected) {
            status = 'in-progress';
        } else {
            status = 'complete';
        }
        var intent_response = response.body.queryResult.fulfillmentText;
        var returnJson = {'status': status, 'intent_response': intent_response};
        console.log(JSON.stringify(returnJson));
        callback(null, returnJson);
    }).catch(function (error) {
        console.log(error);
        console.log(error.errorDetails);
        callback(error);
    });
};