// -----------------------------------------------------------------------------
// Create an object list of keys and their values.
const params = {
    "f1": "hello there",
    "f2": "Dave"
};
console.log("-----------------------------------------------");
console.log("+ Number of params = " + Object.keys(params).length);
var i = 0;
Object.keys(params).forEach(k => {
    console.log("++           " + k + ": " + Object.values(params)[i++]);
});
console.log("+ End of list.");
console.log("-----------------------------------------------");
