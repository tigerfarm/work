<?php
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = getenv('PHONE_NUMBER_1');
// $callTo = getenv('PHONE_NUMBER_2');
$callTo = '+34652308361';
//  TwiML Bin: The Machine, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
//  TwiML Bin: The Machine, Dial Johnathan: https://handler.twilio.com/twiml/EH60153b1250bb2eee3aee934a72123780
//  TwiML Bin: The Machine, Say call from Twilio support: https://handler.twilio.com/twiml/EH10bd59478178c043b058b96142c69e06
//  Function: The Machine, Say Polly: https://obedient-machine-3163.twil.io/saypolly
// http://tigerfarmpress.com/cgi/echo.php
// https://obedient-machine-3163.twil.io/echojson
// https://obedient-machine-3163.twil.io/echojsonvalue
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        array(
            "timeout" => "6",
            "url" => "https://handler.twilio.com/twiml/EH10bd59478178c043b058b96142c69e06",
            "StatusCallback" => "https://obedient-machine-3163.twil.io/echojsonvalue",
            // "statusCallbackMethod" => "POST", // POST GET
            "StatusCallbackEvent" => array("initiated", "ringing", "answered", "completed")
            // "StatusCallbackEvent" => array("answered")
            )
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
