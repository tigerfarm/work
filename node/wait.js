// Following based on:
//      https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time/41957152
//
console.log("+++ Start.");
var seconds = 10;
console.log("+ Wait for " + seconds + " seconds.");
var waitTill = new Date(new Date().getTime() + seconds * 1000);
while(waitTill > new Date()){
     //check for response.
}
console.log("+++ Exit.");
