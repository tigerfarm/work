<?php
// Docs: https://www.twilio.com/docs/voice/api/outgoing-caller-ids#add-an-outgoing-caller-id
// When this program runs, it returns a 6 digit validation code.
// Twilio phoned the phone number and asked for the validation code.
// Once I entered the code, the phone number became verified and it can be used as a caller id.

error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
//
$validation_request = $twilio->validationRequests
        ->create(
        getenv("MY_PHONE_NUMBER"),
        ["friendlyName" => "My mobile Phone Number"]
);
//
echo "\xA+ Validation request: "
 . $validation_request->friendlyName
 . " Validation code: " . $validation_request->validationCode
 . "\xA";
?>
