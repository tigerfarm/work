<?php

class HTTPRequester {

    public static function HTTPGet($accountSid, $authToken, $url, $params) {
        // Sample call: $response = HTTPRequester::HTTPGet("http://localhost/service/foobar.php", array("getParam" => "foobar"));
        $query = "";
        if ($params !== "") {
            $query = '?' . http_build_query($params);
        }
        $ch = curl_init($url . $query);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_USERPWD, $accountSid . ":" . $authToken);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

}

// echo '+++ Start.';
$accountSid = getenv("ACCOUNT_SID");
$authToken = getenv('AUTH_TOKEN');
$syncServieSid = getenv('SYNC_SERVICE_SID');
// curl -X GET https://sync.twilio.com/v1/Services/$SYNC_SERVICE_SID/Maps -u $ACCOUNT_SID:$AUTH_TOKEN
$url = "https://sync.twilio.com/v1/Services/{$syncServieSid}/Maps";
// echo "\xA++ The request URL: ", $url;
$http = new HTTPRequester();
$response = $http->HTTPGet($accountSid, $authToken, $url, "");
// echo "\xA+ Response: {$response}\xA";
// {"maps": []
echo "+ Map list for service SID: " . $syncServieSid;
$jsonResponse = json_decode($response);
// echo "\xA+ $jsonResponse: {$response}";
// print_r($jsonResponse);
// {"maps": [{"unique_name": "counters",
foreach($jsonResponse->maps as $map){
    echo "\xA++ " . $map->unique_name;
}
echo "\xA+ End of list.\xA";
?>
