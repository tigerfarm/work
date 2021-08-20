// -----------------------------------------------------------------------------

console.log("+++ Start.");

aString = '{}';
console.log("+ aString :" + aString + ":");
eString = encodeURI(aString);
console.log("+ eString :" + eString + ":");
console.log("+ decodeURI(eString) :" + decodeURI(eString) + ":");

eString = '2021-08-12T21%3A25%3A40.832Z';
console.log("+ eString :" + eString + ":");
console.log("+ decodeURI(eString) :" + decodeURI(eString) + ":");

// -----------------------------------------------------------------------------
console.log("+++ Exit.");

// eof
