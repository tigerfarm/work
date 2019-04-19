// -----------------------------------------------------------------------------
console.log("+++ Start.");

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

console.log("Enter> ");
standard_input.on('data', function (data) {
    if(data === 'exit\n'){
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        console.log('Echo: ' + data);
        console.log("Enter> ");
    }
});

