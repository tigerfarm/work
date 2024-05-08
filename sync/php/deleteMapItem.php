<?php

class HTTPRequester {

    public static function HTTPDelete($accountSid, $authToken, $url, $data) {
        $query = http_build_query($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_USERPWD, $accountSid . ":" . $authToken);
        curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

}

// -----------------------------------------------------------------------------
$counterName = "counterd";  // The Sync Map Key value used as the counter name.
echo "+ Delete counter: " . $counterName;
// -----------------------------------------------------------------------------
$accountSid = getenv("ACCOUNT_SID");
$authToken = getenv('AUTH_TOKEN');
$syncServieSid = getenv('SYNC_SERVICE_SID');
$syncMapName = getenv('SYNC_MAP_NAME');
$url = "https://sync.twilio.com/v1/Services/{$syncServieSid}/Maps/{$syncMapName}/Items/{$counterName}";
// echo "\xA++ The request URL: ", $url;
$data = array(
    // dumby value because an array is required to make POST values, even though no values are required.
    'dumby' => "nothing"
);
$http = new HTTPRequester();
$response = $http->HTTPDelete($accountSid, $authToken, $url, $data);
// echo "\xA+ Response :{$response}:";
$end = stripos($response, "Access");
$httpResponse = substr($response, 0, $end - 1);
// echo "\xA+ Index of 204:" . stripos($httpResponse, "204");
if (stripos($httpResponse, "204") != null) {
    // HTTP/1.1 204 NO CONTENT
    // 204 No Content - The server has fulfilled the request, however does not return content.
    echo "\xA++ Deleted counter, Key = " . $counterName . ".\xA";
    return;
}
// HTTP/1.1 404 NOT FOUND
// 404 NOT FOUND - delete failed.
// {"code": 20404, "message": "The requested resource
echo "\xA++ HTTP Response code: {$httpResponse}";
$start = stripos($response, "{");
$jsonLength = strlen($response) - $start;
$jsonOnly = substr( $response, $start, $jsonLength );
// echo "\xA+ JSON response:{$jsonOnly}:";
$jsonResponse = json_decode($jsonOnly);
echo "\xA++ Error message: " . $jsonResponse->message . "\xA";

// -----------------------------------------------------------------------------
?>
