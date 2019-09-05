<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatChannel = "CH7b54dec11cea4fd38b189de6af8b03a2";       // abc
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat channel: " . $chatChannel . ":\xA";
//
$members = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels($chatChannel)
                            ->members
                            ->read(array(), 20);
//
foreach ($members as $member) {
    echo "++ Member user"
     . ", SID: " . $member->sid
     . ", identity: " . $member->identity
     . ", attributes: " . $member->attributes
     . "\xA";
}
echo "+ End of list.\xA";
?>
