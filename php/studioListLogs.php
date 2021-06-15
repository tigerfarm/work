<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

// Not working.

echo "+++ Get Studio log list.\xA";
date_default_timezone_set( "UTC" );
$todayStart = date('2021-06-01T00:00:00');
$todayEnd = date('2021-06-10T21:59:59');
$executions = $twilio->studio->v1->flows("FW97fb3aabed8cc508bc8c08af2ce50916")
        ->executions
        ->read([
            "dateCreatedFrom" => date($todayStart),
            "dateCreatedTo" => date($todayStart)
    // "dateCreatedFrom" => new DateTime('2021-06-01T00:00:00Z'),
    // "dateCreatedTo" => new DateTime('2021-06-11T00:00:00Z')
        ],
        20
);

foreach ($executions as $record) {
    print($record->sid);
}

echo "+++ Exit.\xA";
// echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";
?>
