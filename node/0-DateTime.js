// -----------------------------------------------------------------------------
// 
const date = Date();
const theDate = new Date(date);
theMonth = theDate.getMonth() + 1;
if (theMonth < 10) {
    theMonth = "0" + theMonth;
}
theDay = theDate.getDate();
if (theDay < 10) {
    theDay = "0" + theDay;
}
theHours = theDate.getHours() + 1;
if (theHours < 10) {
    theHours = "0" + theHours;
}
theMinutes = theDate.getMinutes() + 1;
if (theMinutes < 10) {
    theMinutes = "0" + theMinutes;
}
console.log("+ Month/Day/Year HH:MM "
        + theMonth + "/" + theDay + "/" + theDate.getFullYear()
        + " " + theHours + ":" + theMinutes
        );
// 
// Timezone testing.
// https://momentjs.com/timezone/docs/
// 
// $ npm install moment-timezone

console.log("-----------------");
let moment = require('moment-timezone');
const timezone = 'America/Los_Angeles';
// const timezone = 'America/Mexico_City';
const minute = moment().tz(timezone).format('mm');
const hour = moment().tz(timezone).format('H');
const dayOfWeek = moment().tz(timezone).format('d');
var theResponse = "+ Time HH:mm " + hour + ":" + minute + " dayOfWeek=" + dayOfWeek;
console.log("+ Time request: " + theResponse);
// 
// https://momentjs.com/timezone/docs/#/using-timezones/getting-zone-names/
// console.log("+ Timezone name: " + moment.tz.names());

console.log("-----------------");
const tzYear = moment().tz(timezone).format('YYYY');
const tzMonth = moment().tz(timezone).format('MM');
const tzDay = moment().tz(timezone).format('DD');
const tzMinute = moment().tz(timezone).format('mm');
const tzHour = moment().tz(timezone).format('H');
const tzSeconds = moment().tz(timezone).format('ss');
// const dayOfWeek = moment().tz(timezone).format('d');
// ----------
dateAndTime = "+ Month/Day/Year HH:MM "
        + tzMonth + "/" + tzDay + "/" + tzYear
        + " " + tzHour + ":" + tzMinute + ":" + tzSeconds
        + " Pacific Time";
console.log(dateAndTime);

console.log("-----------------");
// eof
