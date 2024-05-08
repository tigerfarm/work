<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$transcriptions = $twilio->transcriptions->read(array(), 20);
print("+ List transcriptions:\xA");
foreach ($transcriptions as $record) {
    print("++ Delete transcription, SID: " . $record->sid 
            ." dateCreated: " . $record->dateCreated->format("Y-m-d h:i:s") 
            ." duration: " . $record->duration 
            . "\xA");
    $twilio->transcriptions($record->sid)->delete();
}
print("+ End of list.\xA");
?>
