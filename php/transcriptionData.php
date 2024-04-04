<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$record = $twilio->transcriptions("TR64f99a03c2a71035876d40b517bf4b42")->fetch();
    print("++ Transcription, SID: " . $record->sid 
            ." recordingSid: " . $record->recordingSid 
            ." dateCreated: " . $record->dateCreated->format("Y-m-d h:i:s") 
            ." duration: " . $record->duration 
            . "\xA"
            ." transcriptionText: " . $record->transcriptionText 
            . "\xA");
?>
