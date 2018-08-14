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
?>

<?php
echo '+++ Start.';

$AccountSid = getenv("ACCOUNT_SID");
$fromPhoneNumber = getenv("PHONE_NUMBER_1");
$toPhoneNumber = getenv("PHONE_NUMBER_2");
$theMessage = "Message #1";
//
$url = "https://api.twilio.com/2010-04-01/Accounts/{$AccountSid}/Messages.json";
$data = array('From' => $fromPhoneNumber, 'To' => $toPhoneNumber, 'Body' => $theMessage);
echo "++ Send the messsage, URL: ", $url;
$http = new HTTPRequester();
$response = $http->HTTPPost($AccountSid, $url, $data);
echo "+ Response: {$response}";

echo '+++ Exit.';
?>