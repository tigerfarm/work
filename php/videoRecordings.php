<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$twilio = new Client(getenv('MACHINE_ACCOUNT_SID'), getenv('MACHINE_AUTH_TOKEN'));
// echo "+ ACCOUNT_SID: " . getenv('MACHINE_ACCOUNT_SID') . "\xA";
try {
    $recordings = $twilio->video->v1->recordings->read(
            // ["groupingSid" => ["RM1bcad01487a913184e2f59424e8838af"]], 20
    );
    foreach ($recordings as $record) {
        print('+ SID: ' . $record->sid
                . ' size: ' . $record->size
                . "\xA");
    }
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
echo "+++ Exit.\xA";
?>
