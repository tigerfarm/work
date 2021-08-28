<?php

class HTTPRequester {

    public static function HTTPGet($accountSid, $authToken, $url, $params) {
        // Sample call: $response = HTTPRequester::HTTPGet("http://localhost/service/foobar.php", array("getParam" => "foobar"));
        $query = "";
        if ($params !== "") {
            $url += '?' . http_build_query($params);
        }
        // echo "\xA++ The request GET URL: ", $url;
        $ch = curl_init($url . $query);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_USERPWD, $accountSid . ":" . $authToken);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

}

// Documentation https://www.twilio.com/docs/sync/api/maps
$accountSid = getenv("ACCOUNT_SID");
$authToken = getenv('AUTH_TOKEN');
$syncServieSid = getenv('SYNC_SERVICE_SID');
// curl -X GET https://sync.twilio.com/v1/Services -u $ACCOUNT_SID:$AUTH_TOKEN
$url = "https://sync.twilio.com/v1/Services";
// echo "\xA++ The request URL: ", $url;
$http = new HTTPRequester();
$response = $http->HTTPGet($accountSid, $authToken, $url, "");
// echo "\xA+ Response: {$response}";
echo "+ List:";
$jsonResponse = json_decode($response);
// print_r($jsonResponse);
// {"items": [ {"map_sid": "MP...", ... "data": {"counter": 1}, "revision": "0"}], ...
foreach ($jsonResponse->services as $item) {
    echo "\xA++ sid: " . $item->sid . ", friendly_name = " . $item->friendly_name;
}
echo "\xA+++ Exit.\xA";
?>
