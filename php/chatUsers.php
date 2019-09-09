<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatUser = "USf79ff6faec534a0eaa2bf188aef03546";       // david
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat user: " . $chatUser . ":\xA";
//
$users = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                         ->users
                          ->read(array(), 20);
foreach ($users as $user) {
    echo "++ User, friendlyName: " . $user->friendlyName
        .", attributes: " . $user->attributes
        . "\xA";
}

?>
