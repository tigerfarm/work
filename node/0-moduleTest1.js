// Module to be loaded into a node program.
//      require('./0-moduleTest1.js');
//
var internalNumber = 1; // This variable only accessible in this module.

exports.doAdd = function (x,y) {
  return x + y;
};

// Only "exports" values are accessiable from other programs that "require(...)" this module.
exports.aNumber = 12;
exports.bNumber = internalNumber;

// eof