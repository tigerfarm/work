<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
print("+ Phone number dateCreated, SID, phoneNumber, and friendlyName.". "\xA");
// format('Y-m-d H:i') 
foreach ($twilio->incomingPhoneNumbers->read() as $number) {
    echo $number->dateCreated->format('Y-m-d') 
            . ", " . $number->sid 
            . ", " . $number->phoneNumber 
            . ", " . $number->friendlyName 
            . "\xA";
}

echo "+ End of list.\xA";
?>
