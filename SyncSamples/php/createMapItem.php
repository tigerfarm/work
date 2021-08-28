<?php

class HTTPRequester {

    public static function HTTPPost($accountSid, $authToken, $url, array $params) {
        $query = http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_USERPWD, $accountSid . ":" . $authToken);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

}
// -----------------------------------------------------------------------------
$counterName = "counterf";  // The Sync Map Key value used as the counter name.
$counterValue = 3;          // One of the Sync Map data values.
echo "+ Create counter: " . $counterName . ", as: " . $counterValue;
$jsonData = '{"counter": ' . $counterValue . '}';
// -----------------------------------------------------------------------------
$accountSid = getenv("ACCOUNT_SID");
$authToken = getenv('AUTH_TOKEN');
$syncServieSid = getenv('SYNC_SERVICE_SID');
$syncMapName = getenv('SYNC_MAP_NAME');
$url = "https://sync.twilio.com/v1/Services/{$syncServieSid}/Maps/{$syncMapName}/Items";
$data = array(
    'Ttl' => 0, // 0 - never expires
    'Key' => "{$counterName}",
    'Data' => $jsonData
);
// echo "\xA++ The request URL: ", $url;
// -----------------------------------------------------------------------------
$http = new HTTPRequester();
$response = $http->HTTPPost($accountSid, $authToken, $url, $data);
echo "\xA+ Response :{$response}:";
$end = stripos($response, "Access");
$httpResponse = substr($response, 0, $end - 1);
// echo "\xA+ Index of 204:" . stripos($httpResponse, "204");
if (stripos($httpResponse, "201") != null) {
    // HTTP/1.1 201 CREATED
    echo "\xA++ Created Sync Map Item: " . $counterName . ".\xA";
    return;
}
// -----------------------------------------------------------------------------
// Error handling
echo "\xA++ HTTP Response code: {$httpResponse}";
$start = stripos($response, "{");
$jsonLength = strlen($response) - $start;
$jsonOnly = substr( $response, $start, $jsonLength );
// echo "\xA+ JSON response:{$jsonOnly}:";
$jsonResponse = json_decode($jsonOnly);
echo "\xA++ Error message: " . $jsonResponse->message . "\xA";
// -----------------------------------------------------------------------------
?>
