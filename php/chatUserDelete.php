<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatUser = "USbe68dfa840344873838e1a1d7a68a4ec";
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat user: " . $chatUser . ":\xA";
//
$user = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                         ->users($chatUser)
                         ->delete();
echo "++ User deleted.\xA";
?>
