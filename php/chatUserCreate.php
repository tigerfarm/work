<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatUserIdentity = "mau";
//
$userObj->description = "User to send a welcome message into a new channel.";
$userJSON = json_encode($userObj);
//
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat user: " . $chatUser . ":\xA"
        . "+ attributes: " . $userJSON . ":\xA"
        ;
//
$userCreated = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                        ->users
                        ->create($chatUserIdentity);
//
$user = $twilio->chat->v2->services($CHAT_SERVICE_SID)->users($userCreated->sid)
        ->update(array(
            "friendlyName" => "Welcome user",
            "attributes" => $userJSON
        ));
//
echo "++ User, SID: " . $user->sid
        .", identity: " . $user->identity
        .", friendlyName: " . $user->friendlyName
        .", attributes: " . $user->attributes
        . "\xA";
?>
