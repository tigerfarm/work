<?php

require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
echo '++ Create a video room.' . ":\xA";

$room = $twilio->video->v1->rooms("RM726790fac59fe7eee376230c331422a8")
                          ->update("completed");

echo "+ Room, SID: " . $room->sid . ", uniqueName: " . $room->uniqueName . "\xA";
?>
