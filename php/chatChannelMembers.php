<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatChannel = "CH68abfac99d55431ca14f015056251d51";
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat channel: " . $chatChannel . ":\xA";
//
$members = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels($chatChannel)
                            ->members
                            ->read(array(), 20);
//
date_default_timezone_set('America/Los_Angeles');
foreach ($members as $member) {
    // $date = new DateTime('2001-02-03 04:05:06');
    // $date = new DateTime($member->lastConsumptionTimestamp);
    echo "++ Member user"
     . ", SID: " . $member->sid
     . ", identity: " . $member->identity
     . ", attributes: " . $member->attributes
     . ", index: " . $member->lastConsumedMessageIndex
     . ", Timestamp: " . $member->lastConsumptionTimestamp->format('d/m/Y h:i:s')
     . "\xA";
}
echo "+ End of list.\xA";
?>
