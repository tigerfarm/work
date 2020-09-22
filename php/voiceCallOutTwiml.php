<?php

// https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-with-twiml&code-language=PHP&code-sdk-version=6.x
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$callFrom = getenv('MASTER_PHONE_NUMBER_1');
$callTo = getenv('MY_PHONE_NUMBER');
$call = $client->calls->create(
        // Parameter order is important.
        $callTo,
        $callFrom,
        [
            "twiml" => "<Response><Say>Good day to you</Say></Response>"
        ]
);
echo 'Call SID: ' . $call->sid . "\xA";
echo "+++ Exit.\xA";
?>
