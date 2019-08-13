<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

$services = $twilio->messaging->v1->services->read(array(), 20);
foreach ($services as $record) {
    print("+ Messaging service, SID: " . $record->sid . ", friendlyName: " . $service->friendlyName. "\xA");
    //
    $phoneNumbers = $twilio->messaging->v1->services($record->sid)->phoneNumbers
            ->read(array(), 20);
    foreach ($phoneNumbers as $record) {
        print("++ Messaging service phone number SID: " . $record->sid . " " . $record->phoneNumber . "\xA");
    }
}
?>
