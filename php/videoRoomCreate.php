<?php

require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
echo '++ Create a video room.' . ":\xA";

$room = $twilio->video->v1->rooms
        ->create([
    // "statusCallback" => "https://www.tigerfarmpress.com/cgi/echo.php",
    "type" => "group",
    "maxParticipants" => 2,
    "uniqueName" => "def"
        ]
);

echo "+ Room, SID: " . $room->sid . ", uniqueName: " . $room->uniqueName . "\xA";
?>
