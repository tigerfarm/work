<?php
echo "\xA+++ Date tests.\xA";
//
// http://php.net/manual/en/timezones.php
//
date_default_timezone_set('UTC');
echo "\xA+ Date today UTC: " . date('Y-m-d');   // 2018-08-24
echo "\xA+ Time          : " . date("h:i:sa");
date_default_timezone_set('America/Los_Angeles');
echo "\xA+ Date today PDT: " . date('Y-m-d');   // 2018-08-24
echo "\xA+ Time          : " . date("h:i:sa");
//
$date = new DateTime('2000-01-01');
echo "\xA+ date->format  : ". $date->format('Y-m-d H:i:s');
echo "\xA\xA";

$todayStart = date('Y-m-d') + ' 00:00:00';  // date('2018-08-24 00:00:00')
$todayEnd = date('Y-m-d') + ' 21:59:59';    // date('2018-08-24 21:59:59')
echo "\xA+ todayStart    : " . date($todayStart)->format("Y-m-d h:i:s");
echo "\xA\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
date_default_timezone_set( "America/Los_Angeles" );


$params = array(
    'dateSentAfter' => date($todayStart),
    'dateSentBefore' => date($todayEnd)
);

$result = $client->messages->read($params);
echo '++ List messages: date-time-SID-from-to-status-text.';
foreach ($result as $message) {
    echo "\xA" . $message->dateSent->format("Y-m-d h:i:s")
            . " " . $message->from . " " . $message->to
            . " " . $message->status . " > " . $message->body;
}
echo "\xA+ End of List.";

echo "\xA\xA";
?>
