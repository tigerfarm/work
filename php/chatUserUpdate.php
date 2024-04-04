<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatUserSid = "USa4db8166ecfd4999ab5f1768e1859277";
//
$myObj->fn = "Mau Mau";
$myObj->ln = "Mau";
$myJSON = json_encode($myObj);
//
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
 . "+ Chat user SID: " . $chatUserSid . ":\xA"
 . "+ Chat user attributes: " . $myJSON . ":\xA";
//
$twilio->chat->v2->services($CHAT_SERVICE_SID)->users($chatUserSid)
        ->update(array(
            "friendlyName" => "Marshmellow",
            "attributes" => $myJSON
        ));
//
$user = $twilio->chat->v2->services($CHAT_SERVICE_SID)->users($chatUserSid)
        ->fetch();
echo "++ User"
 . ", friendlyName: " . $user->friendlyName
 . ", attributes: " . $user->attributes
 . "\xA";
?>
