function getRandom(max) {
    // From 0 to the max-1, which works for array.
    min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min));
}
exports.handler = function (context, event, callback) {
    let file = Runtime.getAssets()['mylist.txt'].path;
    const fs = require('fs');
    let text = fs.readFileSync(file).toString('utf-8');
    // console.log('+ File text :' + text + ':');
    let lines = text.split('\n');
    let rNumber = getRandom(lines.length);
    console.log("+ Random line, number: " + rNumber + ", " + lines[rNumber] + ":");
    callback(null, lines[rNumber]);
};
