<?php

class HTTPRequester {

    public static function HTTPGet($url, array $params) {
        // Sample call: $response = HTTPRequester::HTTPGet("http://localhost/service/foobar.php", array("getParam" => "foobar"));
        $query = http_build_query($params);
        $ch = curl_init($url . '?' . $query);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    public static function HTTPPost($url, array $params) {
        $query = http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_USERPWD, getenv('ACCOUNT_SID') . ":" . getenv('AUTH_TOKEN'));
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

}

echo '+++ Start.';

$authyApiKey = getenv("AUTHY_API_KEY");
$authyPhoneNumber = getenv("AUTHY_PHONE_NUMBER1");
$authyCountryCode = getenv('AUTHY_PHONE_COUNTRYCODE');
$authyPasscode = "8448";
//
$url = "https://api.authy.com/protected/json/phones/verification/check";
$data = array('api_key' => $authyApiKey,
    'country_code' => $authyCountryCode, 'phone_number' => $authyPhoneNumber,
    'verification_code' => $authyPasscode);
echo "\xA++ URL Request: ", $url;
$http = new HTTPRequester();
$response = $http->HTTPGet($url, $data);
echo "\xA+ Response: {$response}";

echo "\xA+++ Exit.\xA";
?>