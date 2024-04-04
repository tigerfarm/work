<?php
require __DIR__ . '/../../../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$theConversation = "CHe5581f6e4299402aa77ef237a44c3c40";
print("++ Fetch conversation" . $theConversation . "\xA");
$conversation = $twilio->conversations->v1->conversations($theConversation)->fetch();

print('++ uniqueName:' . $conversation->uniqueName
            . ': friendlyName:' . $conversation->friendlyName
            . ":\xA");

?>
