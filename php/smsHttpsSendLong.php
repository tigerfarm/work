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
//                                                                                                              100
//             1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
$theMessage = "Message long: 5678901234567890123456789012345678901234567890123456789012345678901234567890123456:100123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456:200123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456:300Message long: 5678901234567890123456789012345678901234567890123456789012345678901234567890123456:400123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456:500123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456:600";
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