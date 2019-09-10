<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatUser = "USc11877e91b8e45a9a8166c1125597607";
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat user: " . $chatUser . ":\xA";
//
$user = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                         ->users($chatUser)
                         ->fetch();
//
echo "++ User, SID: " . $user->sid
        .", identity: " . $user->identity
        .", friendlyName: " . $user->friendlyName
        .", attributes: " . $user->attributes
        . "\xA";
?>
