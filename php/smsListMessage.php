<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

$message = $client->messages("SMcd7f6aa857684e71850b5ebca4f9cc27")
                  ->fetch();
echo "+ Sent, SID: " . $message->sid ."To: " . $message->to . "\xA";
?>