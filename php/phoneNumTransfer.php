<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;

// Docs: https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers
// Must authenticate with account where the phone number is current located.
// MAIN_ACCOUNT_SID
// LABS_ACCOUNT_SID
// MACHINE_ACCOUNT_SID
$twilio = new Client(getenv("LABS_ACCOUNT_SID"), getenv('LABS_AUTH_TOKEN'));
// $twilio = new Client("ACf...d", "c...0");

$incoming_phone_number = $twilio->incomingPhoneNumbers("PN1b376bb9768d867c8c591fa9c5730934")
        ->update(array("accountSid" => getenv("MACHINE_ACCOUNT_SID"))
);
echo "++ Transfered\xA";
?>
