<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA";
//
$channels = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels
                            ->read(array(), 20);
//
foreach ($channels as $channel) {
    echo "++ Channel"
     . ", SID: " . $channel->sid
     . ", unique_name: " . $channel->uniqueName
     . ", friendlyName: " . $channel->friendlyName
     . "\xA";
}
echo "+ End of list.\xA";
?>
