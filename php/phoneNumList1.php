<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
print("\xA+ Incoming Phone numbers: dateCreated, SID, phoneNumber, and friendlyName.". "\xA");
foreach ($twilio->incomingPhoneNumbers->read() as $number) {
    echo $number->dateCreated->format('Y-m-d') 
            . ", " . $number->sid 
            . ", " . $number->phoneNumber 
            . ", " . $number->friendlyName 
            . "\xA";
}
print("\xA+ Outcoming Phone numbers (Verified Caller IDs).". "\xA");
foreach ($twilio->outgoingCallerIds->read() as $number) {
    echo $number->dateCreated->format('Y-m-d') 
            . ", " . $number->sid 
            . ", " . $number->phoneNumber 
            . ", " . $number->friendlyName 
            . "\xA";
}

echo "\xA+ End of lists.\xA";
?>
