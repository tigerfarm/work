<?php
require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$conversationSid = "CH7c3fea50d1804fd9bc9c147a84851b18";
$twilio->conversations->v1->conversations($conversationSid)
                          ->delete();
print('++ Deleted Conversation SID: ' . $conversationSid . ":\xA");

?>
