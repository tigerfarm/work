<?php
// require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
$dial->sip('sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar');
echo $response;

// Result from running the above:
//      <Sip>sip:jack@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar</Sip>



