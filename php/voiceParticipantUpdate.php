<?php

if ($argc > 1) {
    $CallSid = $argv[1];
} else {
    $CallSid = $_REQUEST['CallSid'];
}
if ($CallSid === null) {
    echo "0";
    return;
}
echo "+++ Update CallSid: " . $CallSid . "\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

$participant = $twilio->calls($CallSid)
        ->update([
    "twiml" => "<Response><Say>Ahoy there</Say></Response>"
    // "twiml" => '<Redirect method="POST">http://pigeons.com/twiml.xml</Redirect>'
        ]
);

print('+ Put on hold: Participant SID: ' . $participant->to . "\xA");

echo "+++ Exit.\xA";
?>
