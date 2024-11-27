// -----------------------------------------------------------------------------
console.log("+++ Start: fileRemove.");

var fs = require("fs");
var theFilename = '0-fileSample.txt';
fs.rm(theFilename, err => {
    if (err) {
        console.error("- Error: " + err);
    } else {
        console.log("+ File removed: " + theFilename);
    }
    console.log("+++ Exit: fileRemove.");
});
// 
// -----------------------------------------------------------------------------
// eof
