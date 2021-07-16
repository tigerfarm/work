<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
try {
    $rooms = $twilio->video->v1->rooms
            ->read();   // Default is in-progress.
            // ->read(["status" => "completed"]);
    foreach ($rooms as $room) {
        print('+ Room SID: ' . $room->sid
                . " status:" . $room->status
                . " uniqueName:" . $room->uniqueName
                . " maxParticipants:" . $room->maxParticipants
                . "\xA");
    }
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
echo "+++ Exit.\xA";
?>
