<?php

print("++ List conversations.\xA");
require __DIR__ . '/../../../twilio-php-main/srcV6/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));

//           $user = $twilio->conversations->v1->services($teamID)->users($uniqueId)
// $user_conversation = $twilio->conversations->v1->users("UScf92bef0fa0d4e528f6db38b1a32c17d")
$user_conversation = $twilio->conversations->v1->services("IS186702e405b74452a449d67b9265669f")->users("UScf92bef0fa0d4e528f6db38b1a32c17d")
        ->userConversations("CH78b8ac2f9cc64aaeb6396ef50dfb7c2e")
        ->fetch();
print('++ SID: ' . $user_conversation->participantSid
        . ' friendlyName:' . $user_conversation->friendlyName
        . ' unreadMessagesCount:' . $user_conversation->unreadMessagesCount
        . ":\xA");
