// -----------------------------------------------------------------------------
// Timezone testing.
// 
// https://momentjs.com/timezone/docs/
// 
// $ npm install moment-timezone

console.log("-----------------");
let moment = require('moment-timezone');
// const timezone = 'America/Los_Angeles';
const timezone = 'America/Mexico_City';
const minute = moment().tz(timezone).format('mm');
const hour = moment().tz(timezone).format('H');
const dayOfWeek = moment().tz(timezone).format('d');
var theResponse = "+ Time HH:mm " + hour + ":" + minute + " dayOfWeek=" + dayOfWeek;
console.log("+ Time request: " + theResponse);
console.log("-----------------");
// 
// https://momentjs.com/timezone/docs/#/using-timezones/getting-zone-names/
console.log("+ Timezone name: " + moment.tz.names());

// eof
