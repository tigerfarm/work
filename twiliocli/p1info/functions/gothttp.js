const got = require('got');
exports.handler = function(context, event, callback) {
    got.get('http://worldtimeapi.org/api/timezone/America/Winnipeg', {
    }).then(response => {
        console.log(response.body);
        callback(null, 'Winnipeg time: ' + JSON.parse(response.body).datetime);
    }).catch(err => {
        console.error(err);
        callback(err);
    });
};