exports.handler = function(context, event, callback) {
    // With timezone:
    // In Functions/Configure, add NPM name: moment-timezone, version: 0.5.14
    // Timezone function reference: https://momentjs.com/timezone/
    // Reference: https://momentjs.com/docs/#/get-set/weekday/
    let moment = require('moment-timezone');
    //
    // timezone needed for Daylight Saving Time adjustment
    let timezone = event.timezone || 'America/Los_Angeles';
    console.log("+ timezone: " + timezone);
    //
    const hour = moment().tz(timezone).format('H');
    const dayOfWeek = moment().tz(timezone).format('d');
    if ((hour >= 9 && hour < 17) && (dayOfWeek >= 1 && dayOfWeek <= 5)) {
        // "open" from 9am to 5pm, PST., Monday(1) to Friday(5).
        response = "open";
    } else {
        response = "after";
    }
    theResponse = response + " : " + hour + " " + dayOfWeek;
    console.log("+ Time request: " + theResponse);
    callback(null, theResponse);
};