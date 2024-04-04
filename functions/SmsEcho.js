exports.handler = function(context, event, callback) {
    // let theRequest = { get_started: true, abc: "def", xyz: "here", alist: {a: "line1", b: "line2"} };
    let theRequest = event;
    let theJson = JSON.stringify(theRequest);
    console.log("+ JSON: " + theJson);
    //
    // Pretty print JSON.
    console.log("{");
    var st = 1;
    var comma = theJson.indexOf(",");
    var lbraket = theJson.indexOf("{", st);
    var rbraket = theJson.indexOf("}", st);
    var et = comma;
    // console.log("+ st:comma:lbraket:rbraket:et :" + st + ":" + comma + ":" + lbraket + ":" + rbraket + ":" + et + ":");
    if (comma < 0) {
        et = rbraket;
    }
    var ind = "...";
    var indCount = 0;
    while (comma > 0) {
        if (lbraket > 0 && lbraket < comma) {
            nameValue = theJson.substring(st, lbraket);
            console.log(ind + nameValue + " {");
            //
            st = lbraket + 1;
            comma = theJson.indexOf(",", st);
            lbraket = theJson.indexOf("{", st + 1);
            rbraket = theJson.indexOf("}", st + 1);
            if (comma < 0) {
                et = rbraket;
            }
            ind = ind + ind;
            // console.log("+ st:comma:lbraket:rbraket:et :" + st + ":" + comma + ":" + lbraket + ":" + rbraket + ":" + et + ":");
            indCount++;
        }
        if (comma === rbraket + 1) {
            et = et - 1;
        }
        nameValue = theJson.substring(st, et);
        console.log(ind + nameValue);
        if (comma === rbraket + 1) {
            ind = "...";
            console.log(ind + " }");
            indCount--;
        }
        st = comma + 1;
        comma = theJson.indexOf(",", st);
        rbraket = theJson.indexOf("}", et + 1);
        lbraket = theJson.indexOf("{", st + 1);
        et = comma;
        // console.log("+ st:comma:lbraket:rbraket:et :" + st + ":" + comma + ":" + lbraket + ":" + rbraket + ":" + et + ":");
    }
    et = rbraket;
    nameValue = theJson.substring(st, et);
    console.log(ind + nameValue);
    if (indCount > 0) {
        ind = "...";
        console.log(ind + " }");
    }
    console.log("}");
    //
    callback(null, JSON.stringify(theRequest, null, 4));
};