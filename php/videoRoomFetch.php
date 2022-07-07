<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
try {
    $room = $twilio->video->v1->rooms("abc")->fetch();
    print('+ Room SID: ' . $room->sid
            . " uniqueName:" . $room->uniqueName
            . " status:" . $room->status
            . "\xA");
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
echo "+++ Exit.\xA";
?>
