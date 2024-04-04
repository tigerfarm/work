<?php
require __DIR__ . '/../../../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$theConversation = "uniqueName SMS scenario";
print("++ Fetch conversation" . $theConversation . "\xA");
$conversation = $twilio->conversations->v1->conversations($theConversation)->fetch();

print('++ Conversation SID: ' . $conversation->sid
        . '++ uniqueName:' . $conversation->uniqueName
        . ': friendlyName:' . $conversation->friendlyName
        . ":\xA");

?>
