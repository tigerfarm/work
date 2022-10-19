// client.js
console.log( '+ Load module.');
var circle = require('./0-moduleTest1.js');
console.log( '++ 3 + 6 = ' + circle.doAdd(3,6));
console.log( '++ exports.aNumber = ' + circle.aNumber);
console.log( '++ exports.bNumber = ' + circle.bNumber);

