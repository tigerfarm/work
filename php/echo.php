<?php
echo "+++ Echo HTTP request data.\xA";
// Sample call: http://example.com/cgi/echo1.php?To=me&From=you
// Sample response: http://example.com/cgi/echo.txt
// +++ Echo HTTP request data.
// + URL: GET /cgi/echo1.php?To=me&From=you 
// ++ To => me
// ++ From => you
// + End of list.
// +++ Echo HTTP headings.++ Upgrade-Insecure-Requests => 1
// ++ Connection => close
// ++ Cookie => __utma=176104871.536074202.1523554665.1536279403.1536625327.29; __utmz=176104871.1523554665.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmc=176104871
// ++ Accept-Encoding => gzip, deflate
// ++ Accept-Language => en-US,en;q=0.5
// ++ Accept => text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
// ++ User-Agent => Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:59.0) Gecko/20100101 Firefox/59.0
// ++ Host => tigerfarmpress.com

$requestType = $_SERVER['REQUEST_METHOD'];
if ($requestType == "GET") {
    $theArray = $_GET;
} elseif ($requestType == "POST") {
    $theArray = $_POST;
} else {
    echo "+ Request type not GET or POST.\xAExit.\xA";
    return;
}

echo "+ URL: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI'] . " " .  "\xA";
foreach($theArray as $key=>$value){
   echo '++ ' . $key . ' => ' . $value . "\xA";
}
echo "+ End of list.\xA";

$fp = fopen('echo.txt', 'w');
fwrite($fp, '+++ Echo HTTP request data.');
fwrite($fp, "\xA");
fwrite($fp, "+ URL: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI'] . " " .  "\xA" );
foreach($theArray as $key=>$value){
   fwrite($fp, '++ ' . $key . ' => ' . $value . "\xA");
}
fwrite($fp, "+ End of list.\xA");

fwrite($fp, '+++ Echo HTTP headings.');
$headers = apache_request_headers();
foreach ($headers as $header => $value) {
    echo "$header: $value <br />\n";
   fwrite($fp, '++ ' . $header . ' => ' . $value . "\xA");
}

fclose($fp);
?>