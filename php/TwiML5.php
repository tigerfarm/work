<?php
// require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
// $dial->sip('sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar');
$dial->sip('sip:jack@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar');

echo $response;

// Documentation result:
//      <Sip>sip:jack@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar</Sip>
// Actual:
//      <Sip>sip:jack@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar</Sip>
// Expected result:
//      <Sip>sip:jack@example.com?x-mycustomheader=foo&amp;amp;x-myotherheader=bar</Sip>



