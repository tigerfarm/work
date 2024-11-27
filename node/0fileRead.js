// -----------------------------------------------------------------------------
console.log("+++ Start: fileRead.");

var fs = require("fs");
fs.readFile("0fileSample.txt", function (err, data) {
    if (err) {
        console.log("- Error: Not Found.");
    } else {
        console.log(data.toString());
    }
    console.log("+++ Exit: fileRead.");
});
// 
// -----------------------------------------------------------------------------
// eof
