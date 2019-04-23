// To Run:
// 
// $ node /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/NodeJS/public_html/HrbraketloStrings.js
// ...
//
// -----------------------------------------------------------------------------
function doSendSms(theMessage) {
    console.log("+ doSendSms() " + theMessage);
}
function sayMessage(theMessage) {
    console.log("+ sayMessage: " + theMessage);
}
function debugMessage(theMessage) {
    console.log("?- " + theMessage);
}
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

let endNow = 1;
if (endNow === 1) {
    process.exit();
}
// -----------------------------------------------------------------------------
const aString = "Hrbraketlo there.";
const bString = "no go";
//                                                                                                                100
//               12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
const lString = '{"authy_id":40023285,"device_uuid":60414537,"callback_action":"approval_request_status","uuid":"940b6df0-7358-0136-9e2c-0a5b7c2a32fe","status":"approved","approval_request":{"transaction":{"details":null,"device_details":[],"device_geolocation":"","device_signing_time":1532647311,"encrypted":false,"flagged":false,"hidden_details":null,"message":"Allowed okay?","reason":"","requester_details":null,"status":"approved","uuid":"940b6df0-7358-0136-9e2c-0a5b7c2a32fe","created_at_time":15326';

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
let cString = "lo";
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
