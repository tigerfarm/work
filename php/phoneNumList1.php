<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\Rest\Client;

$twilio = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));

print("\xA+ Incoming Phone numbers:". "\xA");
print("dateCreated  SID                                 phoneNumber, and friendlyName.". "\xA");
//        2018-03-28, PN787020b1acf56bfe3ce7f0d36849eccc, +447480822369, 447480822369
foreach ($twilio->incomingPhoneNumbers->read() as $number) {
    echo $number->dateCreated->format('Y-m-d') 
            . "   " . $number->sid 
            . "  " . $number->phoneNumber 
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

