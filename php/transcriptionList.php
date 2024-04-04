<?php
// Sample TwiML to create transcription:
// <Response><Record action="https://about-time-2357.twil.io/cstr2" timeout="6" 
// transcribeCallback="https://about-time-2357.twil.io/sendTranscription" 
// method="GET" recordingStatusCallbackMethod="GET"/>
// </Response>
// 
// ..."TranscriptionUrl":"https://api.twilio.com/2010-04-01/Accounts/account_SID/Recordings/REccb350f665a9b1b185e6e58053b6e52c/Transcriptions/TR781b7b3e486ef977c4ac196f8200610c"
// https://api.twilio.com/2010-04-01/Accounts/account_SID/Recordings/REccb350f665a9b1b185e6e58053b6e52c/Transcriptions/TR781b7b3e486ef977c4ac196f8200610c
//

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$transcriptions = $twilio->transcriptions->read(array(), 20);
print("+ List transcriptions:\xA");
foreach ($transcriptions as $record) {
    print("++ Transcription, SID: " . $record->sid 
            ." recordingSid: " . $record->recordingSid 
            ." dateCreated: " . $record->dateCreated->format("Y-m-d h:i:s") 
            ." duration: " . $record->duration 
            . "\xA"
            ."+++ transcriptionText: " . $record->transcriptionText 
            . "\xA");
}
print("+ End of list.\xA");
?>
