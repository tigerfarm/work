// -----------------------------------------------------------------------------
console.log('+++ Start JSON sample program.');
console.log('');
//
var newToken = "";
responseString = '{"token":"eyJhbGciO"}';
console.log("responseString :" + responseString + ":");
let responseJson = JSON.parse(responseString);
newToken = JSON.parse(responseString).token;
console.log("newToken :" + newToken + ":");
console.log('');
//
console.log('+ JSON.stringify({ x: 2, y: 3, z: 5 }): ' + JSON.stringify({x: 2, y: 3, z: 5}));
myobject = {x: 2, y: 3, z: 5};
console.log('+ myobject: ' + JSON.stringify(myobject));
console.log('+ List JSON data:');
for (const x in myobject) {
    console.log('++ Attribute name: ' + x + ', value: ' + myobject[x]);
}
console.log('');
//
myobject = {"request": {"headers": {"x-request-id": "347d6e6d-1bfa-43a2-9252-1f90d5f81cb7", "sec-fetch-mode": "navigate", "sec-fetch-site": "none", "accept-language": "en-US,en;q=0.5", "sec-fetch-user": "?1", "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", "t-request-id": "RQ452fd61130ae0ac057fe6d58cdec0197", "upgrade-insecure-requests": "1", "accept-encoding": "gzip, deflate, br", "sec-fetch-dest": "document", "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10"}, "cookies": {"c1": "c1v", "c2": "c2v"}}, "f1": "abc", "f2": "def"};
console.log('+ request.headers:' + JSON.stringify(myobject.request.headers));
console.log('+ List JSON headers data:');
for (const x in myobject.request.headers) {
    console.log('++ Attribute name: ' + x + ', value: ' + JSON.stringify(myobject.request.headers[x]));
}
console.log('+ List JSON cookies data:');
for (const x in myobject.request.cookies) {
    console.log('++ Attribute name: ' + x + ', value: ' + JSON.stringify(myobject.request.cookies[x]));
}
console.log('+ List JSON parameter data:');
for (const x in myobject) {
    if (x !== "request") {
        console.log('++ Attribute name: ' + x + ', value: ' + JSON.stringify(myobject[x]));
    }
}
console.log('');
console.log('+++ End');
// eof

