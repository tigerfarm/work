<?php
// cd /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/PhpBasics
// php twVoiceMakeCall-SayText.php
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = getenv('PHONE_NUMBER_1');
$callTo = getenv('PHONE_NUMBER_3');
//  TwiML Bin: The Machine, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
//  Function: The Machine, Say Polly: https://obedient-machine-3163.twil.io/saypolly
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        array(
            "url" => "https://obedient-machine-3163.twil.iox/saypolly",
            "statusCallback" => "http://tigerfarmpress.com/cgi/echo.php",
            "statusCallbackMethod" => "POST",
            "StatusCallbackEvent" => array("initiated", "ringing", "answered", "completed")
            )
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
