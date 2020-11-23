// Sample: https://github.com/request/request

// var theString = '{"Called": "+16505551234", "ToState": "CA"}';
var theString = "{Called=+16505551234, ToState=CA, CallerCountry=US}";
// var theString=theString.replace("=",'": "');
var theString=theString.replace("{",'{"');
var theString=theString.replace("}",'"}');
var theString=theString.replace(/=/g,'": "');
var theString=theString.replace(/, /g,'", "');
console.log('+ theString: ' + theString);
const jsonData = JSON.parse(theString);
console.log("++ jsonData.Called = " + jsonData.Called);

// eof