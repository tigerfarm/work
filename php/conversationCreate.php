<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$conversation = $twilio->conversations->v1->conversations
        ->create(
                array(
                    "messagingServiceSid" => "MG507899be5f0b346466b088f148b94104",
                    "friendlyName" => "Hello Conversation"
                    )
);
print('++ Conversation SID: ' . $conversation->sid . ":\xA");

?>
