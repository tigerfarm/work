// -----------------------------------------------------------------------------
console.log("+++ Start: fileWrite.js");

var fs = require("fs");
var writeFilename = 'docroot/getoutput.txt';
urlComponentMessage = "?- Hello there.\n\r";
fs.writeFile(writeFilename, urlComponentMessage, err => {
    if (err) {
        console.error("- Write error: " + err);
    } else {
        console.log("+ Wrote URL components to: " + writeFilename);
    }
});

console.log("+++ Exit.");
// 
// -----------------------------------------------------------------------------
// eof
