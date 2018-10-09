<?php
// cd /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/PhpBasics
// php twVoiceMakeCall-SayText.php
echo "+++ Put Conference participant on hold.\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$participant = $twilio->conferences("CF10e175b862cfd07b950b0810ab7098fa")
                      ->participants("CAb10af5ff5b9f6a9e988468d7cbbf6f4a")
                      ->update(array(
                                   "hold" => True
                                   // ,"holdUrl" => "http://www.myapp.com/hold"
                               )
                      );
print('+ Participant SID: ' . $participant->callSid . "\xA");

echo "+++ Exit.\xA";
?>
