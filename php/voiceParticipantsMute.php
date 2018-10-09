<?php
// cd /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/PhpBasics
// php twVoiceMakeCall-SayText.php
echo "+++ Start\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

$participant = $twilio->conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                      ->participants("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                      ->update(array("muted" => True));

print($participant->callSid);
echo '+ Participant SID: ' . $participant->callSid . "\xA";
echo "+++ Exit.\xA";
?>
