<?php
echo "+++ List Notify Bindings.\xA";
require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
// I moved the following line into autoload.php, so that all programs will have the deprecated messages removed.
// error_reporting(E_ALL ^ E_DEPRECATED);
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$bindings = $twilio->notify->v1->services(getenv('NOTIFY_SERVICE_SID'))
                              // ->bindings("BSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->fetch();
                              ->bindings->read();
// $bindings = $twilio->notify->services(getenv('NOTIFY_SERVICE_SID'))->bindings->read();
echo "+++ Exit\xA";
?>
