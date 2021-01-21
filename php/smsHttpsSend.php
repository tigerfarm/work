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
        // $response = curl_exec($ch);
        // curl_close($ch);
        // return $response;
        curl_exec($ch);
        curl_close($ch);
        return "";
    }
}

echo "+++ Start.\xA";

$AccountSid = getenv("ACCOUNT_SID");
$fromPhoneNumber = getenv("MASTER_PHONE_NUMBER_1");
$toPhoneNumber = getenv("MY_PHONE_NUMBER");
$theMessage = "Message #1";
$theMessageOkay = "J'aime l'été... éÉÑñ";
//
$url = "https://api.twilio.com/2010-04-01/Accounts/{$AccountSid}/Messages.json";
$data = array('From' => $fromPhoneNumber, 'To' => $toPhoneNumber, 'Body' => $theMessageOkay);
echo "+ Send the messsage, URL: " . $url . "\xA";
print_r($data);

$http = new HTTPRequester();
$response = $http->HTTPPost($AccountSid, $url, $data);
echo "+ Response: {$response}". "\xA";

echo "+++ Exit.\xA";
?>