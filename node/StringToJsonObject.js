// Sample: https://github.com/request/request

// var theString = "{Called=+16508668225, ToState=CA, CallerCountry=US, Direction=inbound, CallerState=CA, ToZip=94030, CallSid=CAb5de599b0b4ca1b7e214bafa6c2c848c, To=+16508668225, CallerZip=94030, ToCountry=US, ApiVersion=2010-04-01, CalledZip=94030, CalledCity=SAN BRUNO, CallStatus=ringing, From=+16508668225, AccountSid=AC1b32414e8ab41e56e6393bcbba7d5a9d, CalledCountry=US, CallerCity=SAN BRUNO, Caller=+16508668225, FromCountry=US, ToCity=SAN BRUNO, FromCity=SAN BRUNO, CalledState=CA}";
// var theString = '{"Called": "+16508668225", "ToState": "CA"}';
var theString = "{Called=+16508668225, ToState=CA, CallerCountry=US}";
// var theString=theString.replace("=",'": "');
var theString=theString.replace("{",'{"');
var theString=theString.replace("}",'"}');
var theString=theString.replace(/=/g,'": "');
var theString=theString.replace(/, /g,'", "');
console.log('+ theString: ' + theString);
const jsonData = JSON.parse(theString);
console.log("++ jsonData.Called = " + jsonData.Called);

// eof