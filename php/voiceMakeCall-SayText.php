<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$callFrom = getenv('MAIN_PHONE_NUMBER_3');
// $callTo = getenv('PHONE_NUMBER2');
// $callTo = getenv('MY_PHONE_NUMBER');
$callTo = '+16505047861';
//  TwiML Bin: The Machine, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
//  TwiML Bin: The Machine, Dial Johnathan: https://handler.twilio.com/twiml/EH60153b1250bb2eee3aee934a72123780
//  TwiML Bin: The Machine, Say call from Twilio support: https://handler.twilio.com/twiml/EH10bd59478178c043b058b96142c69e06
//  Function: The Machine, Say Polly: https://" . getenv('FUNCTIONS_HOST') . "/saypolly
// http://tigerfarmpress.com/cgi/echo.php
// https://" . getenv('FUNCTIONS_HOST') . "/echojson
// https://" . getenv('FUNCTIONS_HOST') . "/echojsonvalue
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        array(
            // "url" => "https://" . getenv('FUNCTIONS_HOST') . "/saypolly",
            "url" => "https://handler.twilio.com/twiml/EHf52349676ed04afb49edd776b8233a0d",
            // "answerOnBridge" => "true"
            // "timeout" => "6",
            // "StatusCallback" => "https://" . getenv('FUNCTIONS_HOST') . "/echojsonvalue",
            // "statusCallbackMethod" => "POST", // POST GET
            // "StatusCallbackEvent" => array("initiated", "ringing", "answered", "completed")
            // "StatusCallbackEvent" => array("answered")
            )
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
