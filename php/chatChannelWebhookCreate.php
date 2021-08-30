<?php
// https://www.twilio.com/docs/autopilot/channels/chat
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatChannel = "CHe0849c95f1314a6bac13574302880d19";       // p1autopilotbot
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
    . "+ Chat channel: " . $chatChannel . ":\xA"
    ;
$items = $twilio->chat->v2->services($CHAT_SERVICE_SID)
        ->channels($chatChannel)
        ->webhooks
        ->create("webhook", // type
                    [
                        "configurationFilters" => ["onMessageSent"],
                        "configurationMethod" => "POST",
                        "configurationUrl" => "https://channels.autopilot.twilio.com/v1/" . $CHAT_SERVICE_SID . "/UA96376fff94c83ea0349a3f97651f4f77/twilio-chat"
                   ]
            );

echo "++ Channel webhook added.\xA";
?>
