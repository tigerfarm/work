<?php

class HTTPRequester {
    public static function HTTPPost($AccountSid, $url, array $params) {
        $AuthToken = getenv('AUTH_TOKEN');
        $query = http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_USERPWD, $AccountSid . ":" . $AuthToken);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
}

echo "+++ Start.\xA";

$AccountSid = getenv("ACCOUNT_SID");
$fromPhoneNumber = getenv("PHONE_NUMBER_2");
$toPhoneNumber = getenv("PHONE_NUMBER_3");
$theMessage = "Message #1";
//
$url = "https://api.twilio.com/2010-04-01/Accounts/{$AccountSid}/Messages.json";
$data = array('From' => $fromPhoneNumber, 'To' => $toPhoneNumber, 'Body' => $theMessage);
echo "+ Send the messsage, URL: " . $url . "\xA";
print_r($data);

$http = new HTTPRequester();
$response = $http->HTTPPost($AccountSid, $url, $data);
echo "+ Response: {$response}". "\xA";

echo "+++ Exit.\xA";
?>