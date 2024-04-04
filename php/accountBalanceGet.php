<?php
class HTTPRequester {
    public static function HTTPGet($AccountSid, $url) {
        $AuthToken = getenv('MASTER_AUTH_TOKEN');
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_USERPWD, $AccountSid . ":" . $AuthToken);
        curl_setopt($ch, CURLOPT_URL, $url);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
}
echo "+++ Start.\xA";
$AccountSid = getenv('MASTER_ACCOUNT_SID');
$url = "https://api.twilio.com/2010-04-01/Accounts/" . $AccountSid . "/Balance.json";
echo "+ HTTP GET URL: " . $url . "\xA";
$http = new HTTPRequester();
$response = $http->HTTPGet($AccountSid, $url );
echo "+ Response: {$response}";
echo "+++ Exit.\xA";
?>