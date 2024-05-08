console.log("+++ Start.");

function sleep(seconds) {
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while (waitTill > new Date()) {
        //check for response.
    }
}

const aValue = 3;
var seconds = 10;
console.log("+ Wait for " + seconds + " seconds.");
var counter = 0;
while (counter < seconds) {
    sleep(1);
    counter++;
    console.log("+ counter = " + counter);
    if (counter === aValue) {
        break;
    }
}

console.log("+++ Exit.");
