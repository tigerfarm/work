<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
// $CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$CHAT_SERVICE_SID = 'IS186702e405b74452a449d67b9265669f'; // Frontline
$chatChannel = "CHf0220442f8974f559ba663c660f0bcea";
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat channel: " . $chatChannel . ":\xA";
//
$members = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels($chatChannel)
                            ->members
                            ->read(array(), 20);
if ($members == null) {
    echo "++ NO members.\xA";
}
date_default_timezone_set('America/Los_Angeles');
foreach ($members as $member) {
    // $date = new DateTime('2001-02-03 04:05:06');
    // $date = new DateTime($member->lastConsumptionTimestamp);
    echo "++ Member user"
     . ", SID: " . $member->sid
     . ", identity: " . $member->identity
     // . ", attributes: " . $member->attributes
     . ", index: " . $member->lastConsumedMessageIndex
     . ", Timestamp: " . $member->lastConsumptionTimestamp->format('d/m/Y h:i:s')
     . "\xA";
}
echo "+ End of list.\xA";
?>
