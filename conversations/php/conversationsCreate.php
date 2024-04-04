<?php
require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$conversation = $twilio->conversations->v1->conversations
        ->create(
                array(
                    // "messagingServiceSid" => "MG507899be5f0b346466b088f148b94104", // Not required for default service.
                    "friendlyName" => "Hello1"
                    )
);
print('++ Conversation SID: ' . $conversation->sid . ":\xA");

?>
