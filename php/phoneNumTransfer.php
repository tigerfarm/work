<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;

// Docs: https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers
// Must authenticate with account where the phone number is current located.
// MAIN_ACCOUNT_SID
// LABS_ACCOUNT_SID
// MACHINE_ACCOUNT_SID
// $twilio = new Client(getenv("LABS_ACCOUNT_SID"), getenv('LABS_AUTH_TOKEN'));
//$incoming_phone_number = $twilio->incomingPhoneNumbers("PN1b376bb9768d867c8c591fa9c5730934")
//        ->update(array("accountSid" => getenv("MACHINE_ACCOUNT_SID"))
// );
//
// PN1b376bb9768d867c8c591fa9c5730934
// PN787020b1acf56bfe3ce7f0d36849eccc 447480822369
// $twilio = new Client("ACf...d", "c...0");
$twilio = new Client("AC1b32414e8ab41e56e6393bcbba7d5a9d", "f46d35a8ac4ef691a374d77a904d6c9a");
$incoming_phone_number = $twilio->incomingPhoneNumbers("PN4fd260f72cde1f16ed96a9580373b171")
        ->update(array("accountSid" => getenv("MAIN_ACCOUNT_SID"))
);
echo "++ Transfered\xA";
?>
