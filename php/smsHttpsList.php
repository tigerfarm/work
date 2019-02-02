<?php

class HTTPRequester {
    public static function HTTPGet($AccountSid, $url) {
        $AuthToken = getenv('AUTH_TOKEN');
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

$AccountSid = getenv("ACCOUNT_SID");
$fromPhoneNumber = getenv("PHONE_NUMBER_2");
$toPhoneNumber = getenv("PHONE_NUMBER_3");
//
$url = "https://api.twilio.com/2010-04-01/Accounts/{$AccountSid}/Messages.json";
$dataParms = 'From=' . $fromPhoneNumber . '&To=' . $toPhoneNumber;
echo "+ Send the messsage, URL: " . $url . "?" . $dataParms . "\xA";
//
$http = new HTTPRequester();
$response = $http->HTTPGet($AccountSid, $url . "?" . $dataParms);
echo "+ Response: {$response}";

echo "+++ Exit.\xA";
?>