<?php
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = getenv('PHONE_NUMBER_4');
$callTo = getenv('PHONE_NUMBER_3');
// TwiML Bin: The Machine, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
// Function: The Machine, Say Polly: https://about-time-2357.twil.io/saypolly
// http://twimlets.com/echo?Twiml=%3C?xml+version=%221.0%22+encoding=%22UTF-8%22?%3E%3CResponse%3E%3CSay+loop%3D%223%22%3EHello%3C%2FSay%3E%3C%2FResponse%3E
$theUrl = "http://twimlets.com/echo?Twiml=" . urlencode('<?xml version="1.0" encoding="UTF-8"?><Response><Say loop="3">Hello</Say></Response>');
echo "+ theUrl: " . $theUrl . "\xA";
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        array(
            "url" => "http://demo.twilio.com/docs/voice.xml"
            )
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
