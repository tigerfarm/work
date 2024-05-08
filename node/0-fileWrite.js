// -----------------------------------------------------------------------------
console.log("+++ Start: fileWrite.");

var fs = require("fs");
var writeFilename = '0-fileSample.txt';
urlComponentMessage = "?- Hello there.\n\r";
fs.writeFile(writeFilename, urlComponentMessage, err => {
    if (err) {
        console.error("- Error: " + err);
    } else {
        console.log("+ Wrote to: " + writeFilename);
    }
    console.log("+++ Exit fileWrite.");
});
// 
// -----------------------------------------------------------------------------
// eof
