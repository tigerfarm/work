<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
try {
    $participants = $twilio->video->rooms("abc")->participants
            ->read();    // Default, the status = connected.
            // ->read(array("status" => "disconnected"));
            // ->read(array("status" => "connected"));
    foreach ($participants as $participant) {
        print('+ Participant SID: ' . $participant->sid
                . " status:" . $participant->status
                . " identity:" . $participant->identity
                . "\xA");
    }
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
echo "+++ Exit.\xA";
?>
