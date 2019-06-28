// -----------------------------------------------------------------------------
(function () {

    aTestString = "This is aTestString.";
    bTestString = "This is bTestString.";
    cTestString = "This is cTestString.";

    funcOne = function () {
        console.log('+ Called: funcOne.');
    };

    funcThree = function (firstName) {
        console.log('+ funcThree, parameter value: ' + firstName);
    };

    name = "David";
    myobject = {
        title: 'Node.JS is cool',
        funcFour: function () {
            console.log('+ myobject function: funcFour() called.');
            return 'return string';
        }
    };

})();
