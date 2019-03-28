<?php
// Documentaion: https://www.twilio.com/docs/voice/api/recording-transcription

if ($argc > 1) {
    $param = $argv[1];
} else {
    echo "+++ Requires a Transcription SID.\xA";
    exit;
}
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

echo '++ Fetch Transcription, SID: ' . $param . ":\xA";
$transcription = $twilio->transcriptions($param)
                        ->fetch();
// Documentation failed: echo "+ dateCreated: " . $transcription->dateCreated->format() . "\xA";
// https://www.twilio.com/docs/voice/api/recording-transcription#transcription-properties
echo "+ status: " . $transcription->status . "\xA";
echo "+ duration: " . $transcription->duration . "\xA";
echo "+ dateCreated: " . $transcription->dateCreated->format("Y-m-d h:i:s") . "\xA";
echo "+ transcriptionText: " . $transcription->transcriptionText . "\xA";
?>
