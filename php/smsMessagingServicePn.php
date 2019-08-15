<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

$services = $twilio->messaging->v1->services->read(array(), 20);
print("+ Messaging Service SID and friendlyName.". "\xA");
print("++ Messaging Service phone number SID, phone number, and friendlyName.". "\xA");
print("----------------------------------------------------------------------". "\xA");
foreach ($services as $record) {
    print($record->sid . ", " . $record->friendlyName . "\xA");
    //
    $phoneNumbers = $twilio->messaging->v1->services($record->sid)->phoneNumbers
            ->read(array(), 20);
    foreach ($phoneNumbers as $record) {
        $incoming_phone_number = $twilio->incomingPhoneNumbers($record->sid)
                ->fetch();
        print($record->sid
                . ", " . $record->phoneNumber
                . ", " . $incoming_phone_number->friendlyName
                . "\xA");
    }
}
?>
