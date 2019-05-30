// -----------------------------------------------------------------------------
console.log("+++ Start.");

var request = require('request');

// -----------------------------------------------------------------------------
function doHelp() {
    sayMessage("------------------------------------------------------------------------------");
    sayMessage("Commands:\n");
    syntaxHttp();
    sayMessage("");
    syntaxSet();
    sayBar();
    sayMessage("> show : Show settings.\n\
> clear : clear the console window.\n\
> help\n\
> exit");
    sayBar();
}
function sayBar() {
    sayMessage("-------------------------");
}

// -----------------------------------------------------------------------------
var thePromptPrefix = "+ Command, ";
var thePrompt = "Enter > ";
function doPrompt() {
    // No line feed after the prompt.
    process.stdout.write(thePromptPrefix + thePrompt);
}
function sayMessage(message) {
    console.log(message);
}

let debugState = 0;
function debugMessage(message) {
    if (debugState !== 0) {
        console.log("?- " + message);
    }
}
function setDebug(value) {
    if (value === "on") {
        debugState = 1;
        debugMessage("set debug on.");
    } else {
        debugState = 0;
        debugMessage("set debug off.");
    }
}

// -----------------------------------------------------------------------------
var attribute = "";
var value = "";
function parseAttributeValue(theType, theCommand) {
    commandLength = theCommand.length;
    commandWordLength = theType.length + 1;
    if (commandLength > commandWordLength) {
        attribute = theCommand.substring(commandWordLength, commandLength);
        value = "";
        ew = theCommand.indexOf(" ", commandWordLength + 1);
        if (ew > 1) {
            attribute = theCommand.substring(commandWordLength, ew).trim();
            value = theCommand.substring(ew, commandLength).trim();
            debugMessage("attribute :" + attribute + ": value :" + value + ":");
            return(1);
        }
    }
    return(0);
}
function parseValue(theType, theCommand) {
    commandLength = theCommand.length;
    commandWordLength = theType.length + 1;
    if (commandLength > commandWordLength) {
        value = theCommand.substring(commandWordLength, commandLength);
        return(1);
    }
    return(0);
}

function syntaxSet() {
    sayMessage("> set <host> <name>");
    sayMessage("+ Twilio test host: https://api.twilio.com:8443/");
    sayMessage("+ Other hosts: http://localhost:8000/ http://tigerfarmpress.com");
    sayMessage("> set debug <on|off>");
    sayMessage("> set debug <on|off>");
    sayMessage("> set headers <JSON>  : {'Content-Type':'application/x-www-form-urlencoded'}");
    sayMessage("> set formdata <JSON> : {'From':'+16505551111','To':'+16505552222','Body':'Hello'}");
}
function doSet(theCommand) {
    if (parseAttributeValue("set", theCommand) === 1) {
        if (attribute === "host") {
            if (!value.endsWith('/')) {
                value = value + '/';
            }
            if (value.startsWith('http')) {
                httpHost = value;
            } else {
                httpDefault = 'https://';
                httpHost = httpDefault + value;
                sayMessage("+ Using HTTPS as default: " + httpHost);
            }
        } else if (attribute === "debug") {
            setDebug(value);
        } else if (attribute === "headers") {
            theHeaders = JSON.parse(value);
        } else if (attribute === "formdata") {
            formData = JSON.parse(value);
        } else {
            syntaxHttp();
            return;
        }
    } else {
        syntaxSet();
    }
}

function syntaxHttp() {
    sayMessage("+ Send an HTTP/HTTPS request to the currently set host name.");
    sayMessage("> http <uri> : Assume HTTP GET.");
    sayMessage("> http get <uri>");
    // sayMessage("> http [<get|post>] <uri>");
}
function doHttp(theCommand) {
    if (parseAttributeValue("http", theCommand) === 1) {
        sayMessage("+ http :" + attribute + ": value :" + value + ":");
    } else {
        if (parseValue("http", theCommand) === 1) {
            debugMessage("http value :" + value + ":");
            attribute = "get";
        } else {
            syntaxHttp();
            doPrompt();
            return;
        }
    }
    if (attribute === "get") {
        httpGet(value);
        return;
    } else if (attribute === "post") {
        httpPost(value);
        return;
    }
    sayMessage("+ Not implemented: " + attribute);
    doPrompt();
}

// -----------------------------------------------------------------------------
function doShow() {
    sayBar();
    sayMessage("+ HTTP host name: " + httpHost);
    if (debugState === 0) {
        sayMessage("++ Debug: off");
    } else {
        sayMessage("++ Debug: on");
    }
    sayMessage("+ HTTP headers: " + JSON.stringify(theHeaders));
    sayMessage("+ HTTP form data: " + JSON.stringify(formData));
    sayBar();
}

function clearScreen() {
    process.stdout.write('\x1Bc');
    sayMessage('+ Running HTTP cli.');
    doPrompt();
}

// -----------------------------------------------------------------------------

var httpHost = "http://localhost:8000/";    // default.
function httpGet(theUri) {
    if (theUri !== "") {
        if (theUri.startsWith('/')) {
            theUrl = httpHost + theUri.substring(1);
        } else {
            theUrl = httpHost + theUri;
        }
    }
    requestGet(theUri, theUrl);
}

function requestGet(theUri, theUrl) {
    debugMessage("theUrl :" + theUrl + ":");
//    request(theUrl, "secureProtocol: 'SSLv3_method'", function (error, response, theResponse) {
    request(theUrl, function (error, response, theResponse) {
        if (error) {
            // Print the error if one occurred
            sayMessage('- Error connecting.');
            doPrompt();
            return;
        }
        if (!response.statusCode.toString().startsWith('2')) {
            var errorMessage = '';
            if (response.statusCode.toString().startsWith('1')) {
                errorMessage = ": Informational.";
            } else if (response.toString().startsWith('3')) {
                errorMessage = ": Redirectory.";
            } else if (response.statusCode === 400) {
                errorMessage = ": Bad request.";
            } else if (response.statusCode === 403) {
                errorMessage = ": Forbidden.";
            } else if (response.statusCode === 404) {
                errorMessage = ": Not found.";
            } else if (response.toString().startsWith('4')) {
                errorMessage = ": Client error.";
            } else if (response.toString().startsWith('5')) {
                errorMessage = ": Server Error.";
            }
            sayMessage('- Status code: ' + response.statusCode + errorMessage + ' ' + theUrl);
            doPrompt();
            return;
        }
        sayBar();
        sayMessage('+ Response code: ' + response.statusCode + ', URL: ' + theUrl);
        sayMessage(response.headers);
        sayMessage('');
        if (theUri !== "show") {
            sayMessage(theResponse);
        } else {
            sayMessage(theResponse.replace(/<br>/g, '\n'));
        }
        sayBar();
        doPrompt();
    });
}

function httpPost(theUri) {
    if (theUri !== "") {
        if (theUri.startsWith('/')) {
            theUrl = httpHost + theUri.substring(1);
        } else {
            theUrl = httpHost + theUri;
        }
    }
    requestPost(theUri, theUrl);
}

function showSamples() {
    sayMessage("------------------------------------------------------------------------------");
    sayMessage("Sample hosts and calling them:\n");
    sayBar();
    sayMessage("set host http://localhost:8000/\n\
http post registration\n\
\n\
set host https://tigauthy.herokuapp.com/\n\
http post /registration\n\
\n\
set host http://tigerfarmpress.com/cgi/\n\
http echo.php?hello=there\n\
http post echo.php\n\
\n\
set host https://account_sid:account_auth_token.twilio.com/2010-04-01/Accounts/account_sid\n\
http post Messages.json\n\
\n\
set host https://api.authy.com/protected/json/sdk/\n\
http post registrations\n\
\n\
");
}

var theHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
var formData = {
    // api_key: process.env.AUTHY_API_KEY_TF,
    // authy_id: process.env.AUTHY_ID
    From: process.env.PHONE_NUMBER4,
    To: process.env.PHONE_NUMBER2,
    Body: 'Hello1'
};
function requestPost(theUri, theUrl) {
    // Future.
    // 
    sayMessage("+ POST theUrl :" + theUrl + ":");
    sayMessage("+ api_key :" + process.env.AUTHY_API_KEY_TF + ":");
    sayMessage("+ authy_id :" + process.env.AUTHY_ID + ":");

    let options = {
        url: theUrl,
        headers: theHeaders,
        form: formData
    };
    request.post(options, function (error, response, theResponse) {
        if (error) {
            // Print the error if one occurred
            sayMessage('- Error connecting.');
            doPrompt();
            return;
        }
        if (!response.statusCode.toString().startsWith('2')) {
            var errorMessage = '';
            if (response.statusCode.toString().startsWith('1')) {
                errorMessage = ": Informational.";
            } else if (response.statusCode === 307) {
                errorMessage = ": Temporary Redirect.";
            } else if (response.toString().startsWith('3')) {
                errorMessage = ": Redirect.";
            } else if (response.statusCode === 400) {
                errorMessage = ": Bad request.";
            } else if (response.statusCode === 401) {
                errorMessage = ": Unauthorized.";
            } else if (response.statusCode === 403) {
                errorMessage = ": Forbidden.";
            } else if (response.statusCode === 404) {
                errorMessage = ": Not found.";
            } else if (response.toString().startsWith('4')) {
                errorMessage = ": Client error.";
            } else if (response.toString().startsWith('5')) {
                errorMessage = ": Server Error.";
            }
            sayMessage('- Status code: ' + response.statusCode + errorMessage);
        } else {
            sayBar();
            sayMessage('+ Response code: ' + response.statusCode + ', URL: ' + theUrl);
        }
        sayMessage(response.headers);
        sayMessage('');
        if (theUri !== "show") {
            sayMessage(theResponse);
        } else {
            sayMessage(theResponse.replace(/<br>/g, '\n'));
        }
        sayBar();
        doPrompt();
    });
}


// -----------------------------------------------------------------------------
doPrompt();
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
standard_input.on('data', function (inputString) {
    theCommand = inputString.substring(0, inputString.length - 1).trim();
    debugMessage('Echo: ' + theCommand + ":");
    // ----------------------------
    if (theCommand === 'show') {
        doShow();
        doPrompt();
    } else if (theCommand.startsWith('http')) {
        doHttp(theCommand);
    } else if (theCommand.startsWith('set')) {
        doSet(theCommand);
        doPrompt();
    } else if (theCommand.startsWith('show')) {
        showSamples(theCommand);
        doPrompt();
    } else if (theCommand === 'help') {
        doHelp();
        doPrompt();
    } else if (theCommand === 'clear') {
        clearScreen();
    } else if (theCommand === 'exit') {
        sayMessage("+ Exit.");
        process.exit();
        // ----------------------------
    } else {
        if (theCommand !== "") {
            sayMessage('- Invaid command: ' + theCommand);
        }
        doPrompt();
    }
});

// eof