// -----------------------------------------------------------------------------
console.log("+++ Start: fileRead.js");

var fs = require("fs");
fs.readFile("fileSample.txt", function (err, data) {
    if (err) {
        console.log("- Error: Not Found.");
    } else {
        console.log(data.toString());
    }
});

console.log("+++ Exit: fileRead.js");
// 
// -----------------------------------------------------------------------------
// eof
