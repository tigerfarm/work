// -----------------------------------------------------------------------------

function getRandom(max) {
    // From 0 to the max-1, which works for array.
    min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min));
}

// -----------------------------------------------------------------------------
console.log("+++ Start.");

// -----------------------------------------------------------------------------

theHeaderString = '{"host":"localhost:8000","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:66.0) Gecko/20100101 Firefox/66.0","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","accept-language":"en-US,en;q=0.5","accept-encoding":"gzip, deflate","connection":"keep-alive","upgrade-insecure-requests":"1","if-none-match":"W/\"a-1JQCjBoSctCmk6lA+bHtlbbOySE\""}';
var theHeaders = theHeaderString.split('","');
for (var i = 0; i < theHeaders.length;i++) {
    if (i===0) {
        console.log('++ ' + theHeaders[i].substring(1,theHeaders[i].length) + '"');
    } else if (i===theHeaders.length-1) {
        console.log('++ "' + theHeaders[i] + '');
    } else {
        console.log('++ "' + theHeaders[i].substring(0,theHeaders[i].length-1) + '"');
    }
}

// -----------------------------------------------------------------------------
var aString = "show : Show settings.\n\
clear : clear the console window.\n\
help\n\
exit";
console.log("+ aString :" + aString + ":");

// aString = "show b c def";
var lines = aString.split('\n');
console.log("+ lines.length :" + lines.length + ":");
console.log("+ lines[1] :" + lines[1] + ":");
var rNumber = getRandom(lines.length);
console.log("+ Random line, number: " + rNumber + ", " + lines[rNumber] + ":");

// -----------------------------------------------------------------------------
console.log("+++ Exit.");

// eof
