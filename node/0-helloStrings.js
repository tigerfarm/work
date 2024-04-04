// -----------------------------------------------------------------------------
// Include declarations and functions.

// See article:
// https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files

var tools = require("./0-cal.js");
var value = tools.addSum(10,20);
console.log("+ Value = " + value);
console.log("-----------------");

const { addSum } = require('./0-cal.js');
console.log('+ addSum(2,3) = ' + addSum(2,3));
console.log("-----------------");

// -----------------------------------------------------------------------------
console.log('+ JSON.stringify({ x: 5, y: 6 }) : ' + JSON.stringify({ x: 5, y: 6 }));

// -----------------------------------------------------------------------------
var d2i = require("./0-declartionsToInclude.js");

console.log('+ aTestString: ' + aTestString);
funcOne();
funcThree('funcThree parameter string');
console.log('+ name: ' + name);
console.log('+ myobject: ' + JSON.stringify(myobject));

console.log(myobject.funcFour());
console.log("-----------------");

// -----------------------------------------------------------------------------
const endNow = 1;

var aString = "";
var bString = "";
var cString = "";

// -----------------------------------------------------------------------------
console.log("-----------------");
//                  123456789012
var aString = 'Tue, 09 Jan 2018 01:30:22 +0000';
let si = aString.indexOf(' ') + 1;
console.log("+ Date :" + aString.substring(si, si + 11) + ":");

if (endNow === 1) {
    process.exit();
}

// -----------------------------------------------------------------------------
console.log("-----------------");
var RELAY_URL = '';
const relayUriStart = '/http/get';
var aString = '/http/get/twiml?p1=abc&p2=def';
// var aString = relayUriStart;

console.log("+ aString :" + aString + ":");
var RELAY_URL = aString.substring(relayUriStart.length).trim();
if (RELAY_URL === '') {
    RELAY_URL = "/";
}
console.log("+ RELAY_URL :" + RELAY_URL + ":");

if (endNow === 1) {
    process.exit();
}


// -----------------------------------------------------------------------------
console.log("-----------------");
// cString = "http://example.com/smstochat?From=%2B16505551111";
cString = "%2B16505551111";
console.log("+ cString :" + cString + ":" + decodeURIComponent(cString) + ":");

console.log("-----------------");
theString = "<br>+ Show chat client attribute settings:<br>++ Joined to channel: +16505551111<br>++ User identity: +16505551111";
cString = theString.replace(/<br>/g, '\n');
console.log("+ cString :" + cString + ":");

// -----------------------------------------------------------------------------
function sayMessage(theMessage) {
    console.log("+ sayMessage: " + theMessage);
}
function debugMessage(theMessage) {
    console.log("?- " + theMessage);
}
function doPrompt() {
    console.log("+ Enter> ");
}
function joinChatChannel(theMessage, description) {
    console.log("?- joinChatChannel :" + theMessage + ": :" + description + ":");
}
// -----------------------------------------------------------------------------
var newToken = "";
responseString = '{"token":"eyJhbGciO"}';
debugMessage("responseString :" + responseString + ":");
let responseJson = JSON.parse(responseString);
newToken = JSON.parse(responseString).token;
debugMessage("newToken :" + newToken + ":");

if (endNow === 1) {
    process.exit();
}

// -----------------------------------------------------------------------------
inputString = "   join   this       is mine   \n";
theCommand = inputString.substring(0, inputString.length - 1).trim().replace(/  /g, ' ');
debugMessage("theCommand :" + theCommand + ":");
commandLength = theCommand.length;
commandWordLength = 'join'.length + 1;
if (commandLength > commandWordLength) {
    theChannel = theCommand.substring(commandWordLength, commandLength);
    theChannelDescription = "";
    ew = theCommand.indexOf(" ", commandWordLength + 1);
    if (ew > 1) {
        theChannel = theCommand.substring(commandWordLength, ew).trim();
        theChannelDescription = theCommand.substring(ew, commandLength).trim();
        debugMessage("theChannel :" + theChannel + ":");
        debugMessage("theChannelDescription :" + theChannelDescription + ":");
    }
    joinChatChannel(theChannel, theChannelDescription);
} else {
    sayMessage("+ Syntax: join <channel> [description]");
    doPrompt();
}

if (endNow === 1) {
    process.exit();
}

// -----------------------------------------------------------------------------

theCommand = "sms this to you";
commandLength = 'sms'.length + 1;
if (theCommand.length > commandLength) {
    thePhrase = theCommand.substring(commandLength).trim();
    debugMessage("thePhrase :" + thePhrase + ":");   // :to you:
    ew = thePhrase.indexOf(" ");
    if (ew > 1) {
        theVerb = thePhrase.substring(0, ew).trim();
        debugMessage("theVerb :" + theVerb + ":");   // :to you:
        if (ew > 1) {
            stringText = thePhrase.substring(ew + 1).trim();
            debugMessage("stringText :" + stringText + ":");
            if (theVerb === 'send') {
                doSendSms(stringText);
            } else if (theVerb === 'to') {
                smsSendTo = stringText;
            } else if (theVerb === 'from') {
                smsSendFrom = stringText;
            } else {
                sayMessage("+ Syntax: sms to|from|send <string>");
            }
        } else {
            sayMessage("+ Syntax: sms to|from|send <string>");
        }
    } else {
        sayMessage("+ Syntax: sms to|from|send <string>");
    }
} else {
    sayMessage("+ Syntax: sms to|from|send <string>");
}

if (endNow === 1) {
    process.exit();
}
// -----------------------------------------------------------------------------
aString = "Hrbraketlo there.";
bString = "no go";
//                                                                                                                100
//               12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
const lString = '{"authy_id":40055585,"device_uuid":60455537,"callback_action":"approval_request_status","uuid":"940b6df0-7358-0136-9e2c-0a5b7c2a32fe","status":"approved","approval_request":{"transaction":{"details":null,"device_details":[],"device_geolocation":"","device_signing_time":1532647311,"encrypted":false,"flagged":false,"hidden_details":null,"message":"Allowed okay?","reason":"","requester_details":null,"status":"approved","uuid":"940b6df0-7358-0136-9e2c-0a5b7c2a32fe","created_at_time":15326';

let sl = 0;
let div = 100;
let iLength = lString.length;
while (iLength > div) {
    console.log("+ " + lString.substring(sl, sl + div));
    iLength -= div;
    sl += div;
}
if (iLength !== 0) {
    console.log("+ " + lString.substring(sl, sl + iLength));
}

if (sl !== 0) {
    process.exit();
}
// -----------------------------------------------------------------------------
cString = "lo";
console.log("+ aString: " + aString);
if (aString.toLowerCase().indexOf(cString) > -1) {
    console.log("+ aString contains :" + cString + ":");
} else {
    console.log("+ aString does not contains :" + cString + ":");
}
console.log("+ bString: " + bString);
if (bString.toLowerCase().indexOf(cString) > -1) {
    console.log("+ bString contains :" + cString + ":");
} else {
    console.log("+ bString does not contains :" + cString + ":");
}
// -----------------------------------------------------------------------------
cString = "Hrbraketlo";
if (aString.startsWith(cString)) {
    console.log("+ aString startsWith :" + cString + ":");
} else {
    console.log("+ aString does not start With :" + cString + ":");
}
cString = "okay";
if (aString.startsWith(cString)) {
    console.log("+ aString startsWith :" + cString + ":");
} else {
    console.log("+ aString does not start With :" + cString + ":");
}

// -----------------------------------------------------------------------------
console.log("-----------------");
cString = "Hrbraketlo";
console.log("+ cString :" + cString + ":");
console.log("+ index   :01234:");
iString = "ll";
i = cString.indexOf(iString);
if (i >= 0) {
    console.log("+ cString contains :" + iString + ": indexOf = " + i);
    console.log("+ cString substring :" + cString.substring(i) + ":");
}
console.log("-----------------");

// -----------------------------------------------------------------------------
// let rJson = { get_started: true, abc: "def", xyz: "here", alist: {a: "line1", b: "line2"}, here: "there", "and": "everywhere"};
let rJson = {get_started: true, abc: "def", xyz: "here", alist: {a: "line1", b: "line2"}, here: "there", "and": "everywhere"};
let pPJson = JSON.stringify(rJson, null, 4);
console.log("+ JSON: " + pPJson + " ");
let theJson = JSON.stringify(rJson);
console.log("+ Pretty print JSON: ");
console.log("+ " + theJson);
console.log("+ 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456");
console.log("+           1         2         3         4         5         6         7         8         9");
{
    //
    // Pretty print JSON.
    console.log("{");
    var st = 1;
    var comma = theJson.indexOf(",");
    var lbraket = theJson.indexOf("{", st);
    var rbraket = theJson.indexOf("}", st);
    var et = comma;
    // console.log("+ st:comma:lbraket:rbraket:et :" + st + ":" + comma + ":" + lbraket + ":" + rbraket + ":" + et + ":");
    if (comma < 0) {
        et = rbraket;
    }
    var ind = "...";
    var indCount = 0;
    while (comma > 0) {
        if (lbraket > 0 && lbraket < comma) {
            nameValue = theJson.substring(st, lbraket);
            console.log(ind + nameValue + " {");
            //
            st = lbraket + 1;
            comma = theJson.indexOf(",", st);
            lbraket = theJson.indexOf("{", st + 1);
            rbraket = theJson.indexOf("}", st + 1);
            if (comma < 0) {
                et = rbraket;
            }
            ind = ind + ind;
            // console.log("+ st:comma:lbraket:rbraket:et :" + st + ":" + comma + ":" + lbraket + ":" + rbraket + ":" + et + ":");
            indCount++;
        }
        if (comma === rbraket + 1) {
            et = et - 1;
        }
        nameValue = theJson.substring(st, et);
        console.log(ind + nameValue);
        if (comma === rbraket + 1) {
            ind = "...";
            console.log(ind + " }");
            indCount--;
        }
        st = comma + 1;
        comma = theJson.indexOf(",", st);
        rbraket = theJson.indexOf("}", et + 1);
        lbraket = theJson.indexOf("{", st + 1);
        et = comma;
        // console.log("+ st:comma:lbraket:rbraket:et :" + st + ":" + comma + ":" + lbraket + ":" + rbraket + ":" + et + ":");
    }
    et = rbraket;
    nameValue = theJson.substring(st, et);
    console.log(ind + nameValue);
    if (indCount > 0) {
        ind = "...";
        console.log(ind + " }");
    }
    console.log("}");
}

// eof
