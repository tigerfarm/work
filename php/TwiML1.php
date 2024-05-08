<?php
// Docs: https://www.twilio.com/docs/sms/quickstart/php-manual-install?code-sample=code-reply-to-a-sms-using-php&code-language=PHP&code-sdk-version=5.x
// require __DIR__ . '/twilio-php-master/Twilio/autoload.php';
require '/Users/dthurston/Projects/twilio-php-master/Twilio/autoload.php';
use Twilio\TwiML;
echo "\xA+ Display TwiML sample.\xA";
// Set the content-type to XML to send back TwiML from the PHP Helper Library
// header("content-type: text/xml");
$response = new TwiML();
$response->message(
    "I'm using the Twilio PHP library to respond to this SMS!"
);
echo $response;
echo "\xA+ End display.\xA";
?>
