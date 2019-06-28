// -----------------------------------------------------------------------------
console.log("+++ Start.");

// -----------------------------------------------------------------------------
function doHelp() {
    sayMessage("------------------------------------------------------------------------------\n\
Commands:\n\
\n\
> show : Show settings.\n\
> clear : clear the console window.\n\
> help\n\
> exit");
    sayBar();
    syntaxSet();
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

function syntaxSet() {
    sayMessage("> set <debug> <on|off>");
}
function doSet(theCommand) {
    commandLength = theCommand.length;
    commandWordLength = 'set'.length + 1;
    if (commandLength > commandWordLength) {
        attribute = theCommand.substring(commandWordLength, commandLength);
        value = "";
        ew = theCommand.indexOf(" ", commandWordLength + 1);
        if (ew > 1) {
            attribute = theCommand.substring(commandWordLength, ew).trim();
            value = theCommand.substring(ew, commandLength).trim();
            debugMessage("attribute :" + attribute + ": value :" + value + ":");
            if (attribute === "debug") {
                setDebug(value);
                return;
            }
        }
    }
    syntaxSet();
}

// -----------------------------------------------------------------------------
function doShow() {
    sayBar();
    if (debugState === 0) {
        sayMessage("++ Debug: off");
    } else {
        sayMessage("++ Debug: on");
    }
    sayBar();
}

function clearScreen() {
    process.stdout.write('\x1Bc');
    sayMessage('+ Running cli.');
    doPrompt();
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
    } else if (theCommand.startsWith('set')) {
        doSet(theCommand);
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