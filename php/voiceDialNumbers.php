<?php
// Docs: https://www.twilio.com/docs/voice/twiml/number
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
$dial->number('858-987-6543');
$dial->number('415-123-4567');
$dial->number('619-765-4321');

echo "++ Response: " . $response . "\xA";
echo "+++ Exit.\xA";
?>
