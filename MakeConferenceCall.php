<?php
echo "+++ Start: MakeConferenceCall.php\n\n";
require __DIR__ . '/../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$callFrom = "+16503331234";
$callTo = "client:stacyhere";    // client:stacyhere or +16503331234
$call = $client->calls->create(
        $callTo,
        $callFrom,
        array("url" => "https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb?conferenceid=support2")
);
echo "Call SID: " . $call->sid . "\n\n";
echo "+++ Exit.\n";
// https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb
// Subaccount Machine, TwiML Bin: Conference Call.
// <?xml version="1.0" encoding="UTF-8"? (remove between "?" and ">") >
// <Response>
//     <Dial><Conference>{{conferenceid}}</Conference></Dial>
// </Response>
?>
