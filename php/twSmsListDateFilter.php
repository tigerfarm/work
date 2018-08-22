<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
date_default_timezone_set( "UTC" );
$params = array(
    'dateSentAfter' => date('2018-08-21 00:00:00'),
    'dateSentBefore' => date('2018-08-21 21:59:59')
);
$result = $client->messages->read($params);
echo '++ List messages.';
foreach ($result as $message) {
    echo "\xA";
    echo $message->dateSent->format("Y-m-d h:i:s"). " " . $message->sid . " " . $message->body;
}
echo "\xA";
echo '+ End of List.';
echo "\xA";
?>
