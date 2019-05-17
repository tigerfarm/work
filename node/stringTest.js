// -----------------------------------------------------------------------------
console.log("-----------------");
// cString = "http://example.com/smstochat?From=%2B16505551111";
cString = "%2B16505551111";
console.log("+ cString :" + cString + ":" + decodeURIComponent(cString)+ ":" );

console.log("-----------------");
theString = "<br>+ Show chat client attribute settings:<br>++ Joined to channel: +16508668188<br>++ User identity: +16508668225";
cString = theString.replace(/<br>/g, '\n');
console.log("+ cString :" + cString + ":");

// -----------------------------------------------------------------------------


// eof
