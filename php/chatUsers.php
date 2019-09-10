<?php
// Documentation: https://www.twilio.com/docs/chat/rest/user-resource
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        ;
//
$users = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                         ->users
                          ->read(array(), 20);
foreach ($users as $user) {
    echo "++ User, SID: " . $user->sid
        .", identity: " . $user->identity
        .", friendlyName: " . $user->friendlyName
        .", attributes: " . $user->attributes
        . "\xA";
}

?>
