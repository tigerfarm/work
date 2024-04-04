<?php

class HTTPRequester {

    public static function HTTPGet($accountSid, $authToken, $url, $params) {
        // Sample call: $response = HTTPRequester::HTTPGet("http://localhost/service/foobar.php", array("getParam" => "foobar"));
        $query = "";
        if ($params !== "") {
            $url += '?' . http_build_query($params);
        }
        // echo "\xA++ The request GET URL: ", $url;
        $ch = curl_init($url . $query);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_USERPWD, $accountSid . ":" . $authToken);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

}

echo "+++ Start.\xA";
$accountSid = getenv("ACCOUNT_SID");
$authToken = getenv('AUTH_TOKEN');
$fromPhoneNumber = "123";
//
// https://lookups.twilio.com/v1/PhoneNumbers/1231231230?Type=carrier
// Cost 1/2 cent:
// $url = "https://lookups.twilio.com/v1/PhoneNumbers/{$fromPhoneNumber}?Type=carrier";
// Free:
$url = "https://lookups.twilio.com/v1/PhoneNumbers/{$fromPhoneNumber}";
$data = array('Type' => 'carrier');
echo "++ Send the messsage, URL: ", $url;
$http = new HTTPRequester();
$response = $http->HTTPGet($accountSid, $authToken, $url, "");
echo "\xA+ Response: {$response}\xA";
echo "+ List value for the counter: " . $counterName;
$jsonResponse = json_decode($response);
print_r($jsonResponse);
if ($jsonResponse->status == "404") {
    echo "\xA-- Error: " . $jsonResponse->code . " " . $jsonResponse->message;
} else {
    echo "\xA++ national_format: " . $jsonResponse->national_format;
    echo "\xA++ carrier->name: " . $jsonResponse->carrier->name;
}
echo "\xA+++ Exit.\xA";
?>