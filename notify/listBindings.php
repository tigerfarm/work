<?php
echo "+++ List Notify Bindings.\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$bindings = $twilio->notify->v1->services(getenv('NOTIFY_SERVICE_SID'))
        ->bindings->read();
foreach ($bindings as $record) {
    print("++ " . $record->sid . " " . $record->identity . "\xA");
}
echo "+++ Exit\xA";
?>
