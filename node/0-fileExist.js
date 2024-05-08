// -----------------------------------------------------------------------------
console.log("+++ Start: fileExist.");

var fs = require("fs");
var theFilename = '0-fileSample.txt';
if (fs.existsSync(theFilename)) {
    console.log("+ File Found: " + theFilename);
} else {
    console.log("+ File NOT Found: " + theFilename);
}

console.log("+++ Exit: fileExist.");
// 
// -----------------------------------------------------------------------------
// eof
