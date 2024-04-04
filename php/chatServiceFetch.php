<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = "IS973ddbf230364f8dab02c6418779a602";
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        ;
//
$service = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->fetch();
//
echo "++ Service"
     . ", SID: " . $service->sid
     . ", friendlyName: " . $service->friendlyName
     . ", readStatusEnabled: " . $service->readStatusEnabled
     . "\xA";
?>
