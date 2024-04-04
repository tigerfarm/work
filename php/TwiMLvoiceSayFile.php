<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\TwiML\VoiceResponse;

$theFilename = "0fileWrite.txt";
echo '+++ Read file: ', $theFilename, "\xA";
$myfile = fopen($theFilename, "r") or die("- Error, Unable to open the file" . $theFilename. "\xA");
$fileText = fread($myfile,filesize($theFilename));
echo "+ File text :" . $fileText . ":\xA";
fclose($myfile);

$response = new VoiceResponse();
$response->say("Welcome to the machine.");
$response->say($fileText);
echo $response;
