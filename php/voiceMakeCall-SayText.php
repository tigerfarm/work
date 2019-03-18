<?php
// cd /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/PhpBasics
// php twVoiceMakeCall-SayText.php
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = getenv('PHONE_NUMBER_1');
$callTo = getenv('PHONE_NUMBER_2');
//  TwiML Bin: The Machine, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
//  TwiML Bin: The Machine, Dial Johnathan: https://handler.twilio.com/twiml/EH60153b1250bb2eee3aee934a72123780
//  Function: The Machine, Say Polly: https://obedient-machine-3163.twil.io/saypolly
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        array(
            "url" => "https://handler.twilio.com/twiml/EH6496eeccd2e1da86887b3ff5a7cd8186",
            // "statusCallback" => "http://tigerfarmpress.com/cgi/echo.php",
            // "statusCallbackMethod" => "POST",
            // "StatusCallbackEvent" => array("initiated", "ringing", "answered", "completed")
            )
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
