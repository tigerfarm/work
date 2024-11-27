// -----------------------------------------------------------------------------
console.log("+++ Start: Read CSV file into JSON attribute-value pairs.");
// The first line of the CSV file is the attribute names.
//
var fs = require("fs");
//
// npm install csv-parser
const csv = require('csv-parser');
//
const results = [];
fs.createReadStream('0fileReadCsv.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Process each CSV row.
            // console.log("+ results " + JSON.stringify(results[0]));
            console.log("+ results.length :" + results.length);
            for (var i = 0; i < results.length; i++) {
                iString = i + 1;
                console.log('++ "' + iString + ": " + results[i].Business_Name + '"'
                        + ', ' + results[i].f2
                        );
            }
            console.log("+++ Exit: fileRead.");
        });
// -----------------------------------------------------------------------------
// eof
