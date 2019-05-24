// -----------------------------------------------------------------------------

function getRandom(max) {
    // From 0 to the max-1, which works for array.
    min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min));
}

// -----------------------------------------------------------------------------
console.log("+++ Start.");

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

console.log("+++ Exit.");

// -----------------------------------------------------------------------------


// eof
