// Module to be loaded into a node program.
//      require('./0-moduleTest1.js');
//
var aNumber = 9; // PI will not be accessible from outside this module
exports.doAdd = function (x,y) {
  return x + y;
};

exports.aNumber = 12;
