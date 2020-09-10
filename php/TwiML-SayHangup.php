<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\TwiML;

echo "+ Display TwiML sample.\xA";
$twiml = new TwiML();
$twiml->say("Hello and Goodbye");
$twiml->hangup();
echo "+ TwiML[" . $twiml . "]\xA";

echo "+ End display.\xA";
?>
