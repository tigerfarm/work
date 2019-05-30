// -----------------------------------------------------------------------------
console.log("+++ Start.");
function doPrompt() {
    // No line feed after the prompt.
    process.stdout.write("Enter> ");
}
function sayMessage(message) {
    console.log(message);
}
// -----------------------------------------------------------------------------
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
doPrompt();
standard_input.on('data', function (inputString) {
    theCommand = inputString.substring(0, inputString.length - 1).trim();
    if (theCommand === 'exit') {
        sayMessage("+++ Exit.");
        process.exit();
    } else {
        if (theCommand !== "") {
            sayMessage('- Invaid command: ' + theCommand);
        }
    }
    doPrompt();
});

