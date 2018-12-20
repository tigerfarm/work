<?php
// cd /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/PhpBasics
// php twVoiceMakeCall-SayText.php
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = getenv('PHONE_NUMBER_1');
$callTo = getenv('PHONE_NUMBER_4');
// TwiML Bin: The Machine, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
// Function: The Machine, Say Polly: https://obedient-machine-3163.twil.io/saypolly
// TwiML Bin: https://handler.twilio.com/twiml/EH8ad7d54854660cfd0d473f054e7cde17?theNumber=1235
// TwiML Bin: https://handler.twilio.com/twiml/EH1f22158497e6ccb425cc75e724dd4e16?theNumber=1235
// $theMessage = urlencode('1 2 3 5.');
// $theUrl = "https://handler.twilio.com/twiml/EH1f22158497e6ccb425cc75e724dd4e16?theNumbers=" . $theMessage;
$theUrl = "https://obedient-machine-3163.twil.io/saypolly";
echo '+ theUrl ' . $theUrl . "\xA";
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        array(
            "url" => $theUrl
            )
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
