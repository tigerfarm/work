// -----------------------------------------------------------------------------
console.log("+++ Start: appendFile.");

var fs = require("fs");
var writeFilename = '0-fileSample.txt';
urlComponentMessage = "?- Back to you.\n\r";
fs.appendFile(writeFilename, urlComponentMessage, err => {
    if (err) {
        console.error("- Write error: " + err);
    } else {
        console.log("+ Appended to: " + writeFilename);
    }
    console.log("+++ Exit: appendFile.");
});

// 
// -----------------------------------------------------------------------------
// eof
