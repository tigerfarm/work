<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        ;
//
$channel = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels
                            ->create();
//
$chatChannelSid = $channel->sid;       // abc
echo "++ Channel created, SID: " . "" . $chatChannelSid . "\xA";
//
$twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels($chatChannelSid)
                            ->update(array(
                                "uniqueName" => "c1",
                                "friendlyName" => "The c1 channel"
                                ));
//
echo "++ Channel updated.\xA";
?>
