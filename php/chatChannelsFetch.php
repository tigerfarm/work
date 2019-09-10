<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatChannel = "CH68abfac99d55431ca14f015056251d51";
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat channel: " . $chatChannel . ":\xA"
        ;
//
$channel = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels($chatChannel)
                            ->fetch();
//
echo "++ Channel"
     . ", SID: " . $channel->sid
     . ", unique_name: " . $channel->uniqueName
     . ", friendlyName: " . $channel->friendlyName
     . "\xA";
?>