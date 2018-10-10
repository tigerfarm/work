<?php

// Create a Participant – Agent Conference only
// This maybe a key to warm transfer.
// Agent Conference is now Generally Available:
// https://www.twilio.com/blog/2017/12/agent-conference-generally-available.html
// Documentation:
// https://www.twilio.com/docs/voice/api/conference-participant?code-sample=code-update-mute-a-participant&code-language=PHP&code-sdk-version=5.x#participant-properties
echo "+++ Start: MakeConferenceCall.php\n\n";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = "+16503331111";
$callTo = "+16503339999";    // client:stacyhere or +16503331234
try {
    $call = $client->calls->create(
        $callTo,
        $callFrom,
        array("url" => "https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb?conferenceid=support2")
    );
}
catch(Exception $e) {
    // echo "- Exception: " . $e . "\n\n";
    echo "- Exception.\n\n";
    return;
}
echo "Call SID: " . $call->sid . "\n\n";
echo "+++ Exit.\n";
?>
