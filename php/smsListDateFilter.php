<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
date_default_timezone_set( "UTC" );
$todayStart = date('Y-m-d') + ' 00:00:00';  // date('2018-08-24 00:00:00')
$todayEnd = date('Y-m-d') + ' 21:59:59';    // date('2018-08-24 21:59:59')
$params = array(
    'dateSentAfter' => date($todayStart),
    'dateSentBefore' => date($todayEnd)
);
$result = $client->messages->read($params);
echo '++ List messages.';
foreach ($result as $message) {
    echo "\xA" . $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->status . " " . $message->body;
}
echo "\xA+ End of List.";
?>
