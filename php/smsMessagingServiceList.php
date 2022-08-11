<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

$services = $twilio->messaging->v1->services->read(array(), 20);
print("+ Messaging Service SID and friendlyName.". "\xA");
foreach ($services as $record) {
    print($record->sid . "  " . $record->friendlyName. "\xA");
}
?>
