// -----------------------------------------------------------------------------

console.log("+++ Start.");

aString = '{}';
console.log("+ aString :" + aString + ":");
eString = encodeURI(aString);
console.log("+ eString :" + eString + ":");
console.log("+ decodeURI(eString) :" + decodeURI(eString) + ":");

eString = '2021-08-12T21%3A25%3A40.832Z';
// eString = 'PhoneNumber%3D%2B18587269919%26SmsUrl%3Dhttps%3A%2F%2Fdemo.twilio.com%2Fwelcome%2Fsms%2Freply%26SmsMethod=POST';
console.log("+ eString :" + eString + ":");
console.log("+ decodeURI(eString) :" + decodeURI(eString) + ":");

console.log("+ decodeURI(eString) :" + decodeURI("DeliveryState%5B0%5D") + ":");

eString = 'SAN+BRUNO';
console.log("+ decodeDoubleEncodedBuffer(eString) :" + decodeDoubleEncodedBuffer(eString) + ":");

// -----------------------------------------------------------------------------
console.log("+++ Exit.");

// eof
