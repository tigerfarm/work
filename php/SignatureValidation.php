<?php
echo "+++ Start.\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Security\RequestValidator;
$token = getenv('AUTH_TOKEN');
// Data order matters with PHP. In Node, data order didn't matter.
$postVars = array(
 'ToCountry' => 'US',
 'ToState' => 'CA',
 'SmsMessageSid' => 'SMbe794ce78f6b9fdf853d2acb76c080db',
 'NumMedia' => '0',
 'ToCity' => 'SAN BRUNO',
 'FromZip' => '94030',
 'SmsSid' => 'SMbe794ce78f6b9fdf853d2acb76c080db',
 'FromState' => 'CA',
 'SmsStatus' => 'received',
 'FromCity' => 'SAN BRUNO',
 'Body' => 'hello 5',
 'FromCountry' => 'US',
 'To' => '+16505558225',
 'ToZip' => '94030',
 'NumSegments' => '1',
 'MessageSid' => 'SMbe794ce78f6b9fdf853d2acb76c080db',
 'AccountSid' => 'AC1...d',
 'From' => '+16505551199',
 'ApiVersion' => '2010-04-01'
);
$validator = new RequestValidator($token);
$signature = 'N...Q=';
$url = 'https://tigerfarmpress.com/cgi/echo.php';
if ($validator->validate($signature, $url, $postVars)) {
    echo "Confirmed to have come from Twilio.\xA";
} else {
    echo "NOT VALID.\xA";
}

echo "+++ Exit.\xA";