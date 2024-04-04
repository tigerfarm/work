<?php
echo "+++ List Notify Bindings.\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
// $bindings = $twilio->notify->v1->services(getenv('NOTIFY_SERVICE_SID'))
$bindings = $twilio->notify->v1->services('IS6b86eea51935a036f0ae440652761e8a')
        ->bindings->read();
foreach ($bindings as $record) {
    print("++ " . $record->sid . " " . $record->identity . "\xA");
}
echo "+++ Exit\xA";
?>
