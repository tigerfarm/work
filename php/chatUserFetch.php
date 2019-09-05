<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatUser = "USf79ff6faec534a0eaa2bf188aef03546";       // david
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat user: " . $chatUser . ":\xA";
$user = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                         ->users($chatUser)
                         ->fetch();
echo "++ User, friendlyName: " . $user->friendlyName
        .", attributes: " . $user->attributes
        . "\xA";
?>
