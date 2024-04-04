<?php

require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
//
// Loop over the list of records and echo a property for each one
foreach ($client->usage->records->read() as $record) {
    echo "+ Category: " . $record->category . ", count: " . $record->count . "\xA";
}

// echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";
?>
