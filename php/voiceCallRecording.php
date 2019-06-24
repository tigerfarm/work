<?php

echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = getenv('PHONE_NUMBER1');
// $callTo = getenv('PHONE_NUMBER2');
$callTo = getenv('PHONE_NUMBER_HOME');
//  TwiML Bin: The Machine,
//  Say poem with record: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
echo "+ Calling from: " . $callFrom . ", To: " . $callTo . "\xA";
$call = $client->calls->create(
        $callTo, $callFrom, array(
    "url" => "https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4",
    "record" => "true",
    "StatusCallback" => "http://tigerfarmpress.com/cgi/echo.php"
        )
);
echo '+ Call SID:      ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
