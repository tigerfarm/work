// -----------------------------------------------------------------------------
console.log("+++ Start.");

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

console.log("Enter> ");
standard_input.on('data', function (data) {
    console.log('Echo: ' + data + ":");
    theCommand = data.substring(0, data.length -1);
    console.log('Echo :' + theCommand + ":");
    if(data === 'exit\n'){
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        console.log('Echo: ' + data);
        console.log("Enter> ");
    }
});

