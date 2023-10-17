// -----------------------------------------------------------------------------
// 
const date = Date();
const theDate = new Date(date);
theMonth = theDate.getMonth() + 1;
pMonth = "";
if (theMonth < 10) {
    pMonth = "0";
}
theDay = theDate.getDay() + 1;
pDay = "";
if (theDay < 10) {
    pDay = "0";
}
theHours = theDate.getHours() + 1;
pHours = "";
if (theHours < 10) {
    pHours = "0";
}
theMinutes = theDate.getMinutes() + 1;
pMinutes = "";
if (theMinutes < 10) {
    pMinutes = "0";
}
console.log("+ Month/Day/Year HH:MM "
        + pMonth + theMonth
        + "/" + pDay + theDay
        + "/" + theDate.getFullYear()
        + " " + pHours + theHours + ":" + pMinutes + theMinutes
        );
// 
// Timezone testing.
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
// console.log("+ Timezone name: " + moment.tz.names());

// eof
