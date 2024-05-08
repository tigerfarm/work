<?php
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = getenv('PHONE_NUMBER1');
// $callTo = getenv('PHONE_NUMBER2');
// $callTo = getenv('PHONE_NUMBER_HOME');
$callTo = getenv('MY_PHONE_NUMBER');
//  TwiML Bin: The Machine, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
//  Function: The Machine, Say Polly: https://" . getenv('FUNCTIONS_HOST') . "/saypolly
// https://" . getenv('FUNCTIONS_HOST') . "/echojson
// https://" . getenv('FUNCTIONS_HOST') . "/echojsonvalue
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        array(
            "url" => "https://" . getenv('FUNCTIONS_HOST') . "/saypolly"
            // "url" => "https://handler.twilio.com/twiml/EH0ac66450c2524d82ea1963e88fbdcec2"
            // ,"answerOnBridge" => "true"
            // ,"timeout" => "6"
            ,"StatusCallback" => "https://" . getenv('FUNCTIONS_HOST') . "/echojsonvalue"
            ,"statusCallbackMethod" => "GET" // POST GET
            ,"StatusCallbackEvent" => array("initiated", "ringing", "answered", "completed")
            // ,"StatusCallbackEvent" => array("answered")
            )
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
