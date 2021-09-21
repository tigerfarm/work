<?php
echo "+++ Start.\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Security\RequestValidator;
$token = getenv('AUTH_TOKEN');
// Data order matters with PHP. In Node, data order didn't matter.
// ++ ToCountry => US
// ++ ToState => CA
// ++ SmsMessageSid => SM5b6f34ffe3a4015a838430dfc96ba84f
// ++ NumMedia => 0
// ++ ToCity => SAN BRUNO
// ++ FromZip => 94030
// ++ SmsSid => SM5b6f34ffe3a4015a838430dfc96ba84f
// ++ FromState => CA
// ++ SmsStatus => received
// ++ FromCity => SAN BRUNO
// ++ Body => hello 4
// ++ FromCountry => US
// ++ To => +16505551111
// ++ ToZip => 94030
// ++ NumSegments => 1
// ++ MessageSid => SM5b6f34ffe3a4015a838430dfc96ba84f
// ++ AccountSid => AC1...d
// ++ From => +16505552222
// ++ ApiVersion => 2010-04-01
// + End of list.
// +++ Echo HTTP headings.++ Connection => close
// ++ User-Agent => TwilioProxy/1.1
// ++ X-Twilio-Signature => Y2qkTMkpIFtB7g8Eqp1NE0TZ6Lg=
$postVars = array(
 'ToCountry' => 'US',
 'ToState' => 'CA',
 'SmsMessageSid' => 'SM5b6f34ffe3a4015a838430dfc96ba84f',
 'NumMedia' => '0',
 'ToCity' => 'SAN BRUNO',
 'FromZip' => '94030',
 'SmsSid' => 'SM5b6f34ffe3a4015a838430dfc96ba84f',
 'FromState' => 'CA',
 'SmsStatus' => 'received',
 'FromCity' => 'SAN BRUNO',
 'Body' => 'hello 4',
 'FromCountry' => 'US',
 'To' => '+16508668225',
 'ToZip' => '94030',
 'NumSegments' => '1',
 'MessageSid' => 'SMbe794ce78f6b9fdf853d2acb76c080db',
 'AccountSid' => getenv('MASTER_ACCOUNT_SID'),
 'From' => '+16508661199',
 'ApiVersion' => '2010-04-01'
);
$validator = new RequestValidator($token);
$signature = 'Y2qkTMkpIFtB7g8Eqp1NE0TZ6Lg=';
$url = 'https://tigerfarmpress.com/cgi/echo.php';
if ($validator->validate($signature, $url, $postVars)) {
    echo "Confirmed to have come from Twilio.\xA";
} else {
    echo "NOT VALID.\xA";
}

echo "+++ Exit.\xA";