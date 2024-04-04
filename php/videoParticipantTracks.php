<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
try {
    $publishedTracks = $twilio->video->rooms("abc")
                    ->participants("dave")
            ->publishedTracks->read();
    foreach ($publishedTracks as $publishedTrack) {
        print('+ Participant SID: ' . $publishedTrack->sid
                . " kind:" . $publishedTrack->kind
                . " name:" . $publishedTrack->name
                . "\xA");
    }
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
echo "+++ Exit.\xA";
?>
