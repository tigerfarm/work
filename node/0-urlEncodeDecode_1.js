const uri = 'https://demo.twilio.com/welcome/sms';
const encoded = encodeURI(uri);
console.log("+ uri = " + uri);
console.log("+ encodeURI(uri) = " + encodeURI(uri));
// Expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

// const encodedString = 'PhoneNumber%3D%2B18587269919%26SmsUrl%3Dhttps%3A%2F%2Fdemo.twilio.com%2Fwelcome%2Fsms%2Freply%26SmsMethod=POST';
try {
console.log("+ decodeURI(encoded) = " + decodeURI(encoded));
  // Expected output: "https://mozilla.org/?x=шеллы"
} catch (e) { // Catches a malformed URI
  console.error(e);
}