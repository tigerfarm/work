<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;

// MAIN_ACCOUNT_SID
// LABS_ACCOUNT_SID
// MACHINE_ACCOUNT_SID
$twilio = new Client(getenv('MACHINE_ACCOUNT_SID'), getenv('MACHINE_AUTH_TOKEN'));
// $twilio = new Client(getenv('LABS_ACCOUNT_SID'), getenv('LABS_AUTH_TOKEN'));

print("\xA+ Incoming Phone numbers: dateCreated, SID, phoneNumber, and friendlyName.". "\xA");
foreach ($twilio->incomingPhoneNumbers->read() as $number) {
    echo $number->dateCreated->format('Y-m-d') 
            . ", " . $number->sid 
            . ", " . $number->phoneNumber 
            . ", " . $number->friendlyName
            . "\xA";
}
print("\xA+ Outgoing Phone numbers (Verified Caller IDs).". "\xA");
foreach ($twilio->outgoingCallerIds->read() as $number) {
    echo $number->dateCreated->format('Y-m-d') 
            . ", " . $number->sid 
            . ", " . $number->phoneNumber 
            . ", " . $number->friendlyName 
            . "\xA";
}

echo "\xA+ End of lists.\xA";

