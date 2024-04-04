<?php
echo "+++ Echo HTTP request data.\xA";

require __DIR__ . '/../twilio-php-master/Twilio/autoload.php';
use Twilio\Authy\AuthyApi;
$authy_api = new AuthyApi(getenv('AUTHY_API_KEY'));

// $via = "sms";
$phone_number = getenv("AUTHY_PHONE_NUMBER1");
$country_code = getenv("AUTHY_PHONE_COUNTRYCODE");
$token = "123456";

// $response = $authyApi->phoneVerificationStart($phone_number, $country_code, $via);
$result = $authyApi->phoneVerificationCheck($phone_number, $country_code, $token);
if ($response->ok()) {
    echo response()->json($response->message(), 200);
} else {
    echo response()->json((array) $response->errors(), 400);
}

echo "+ End of list.\xA";
?>
