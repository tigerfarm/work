<?php
header('Content-Type: text/plain');
class HTTPRequester {
    public static function HTTPGet($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
}
echo "+++ Echo HTTP request data.\xA";
$requestType = $_SERVER['REQUEST_METHOD'];
if ($requestType == "GET") {
    $theArray = $_GET;
} else {
    echo "+ Request type not GET.\xAExit.\xA";
    return;
}
// Data Indices:
// https://www.php.net/manual/en/reserved.variables.server.php
// http://tigerfarmpress.com/cgi/cl.php?https://tigerfarmpress.com/hello.txt
echo "+ URL: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI'] . " " .  $_SERVER['QUERY_STRING']. " " . $_SERVER['DOCUMENT_ROOT'] . "\xA";
$url = $_SERVER['QUERY_STRING'];
echo "+ HTTPS request URL: " . $url . "\xA";
//
$http = new HTTPRequester();
$response = $http->HTTPGet($url);
echo "+ Response: {$response}";
$fp = fopen('cl.txt', 'w');
fwrite($fp, $response);
fclose($fp);
?>
