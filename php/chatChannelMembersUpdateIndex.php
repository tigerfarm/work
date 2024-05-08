<?php
// Documenation: https://www.twilio.com/docs/chat/rest/member-resource

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatChannel = "CH68abfac99d55431ca14f015056251d51";        // c1
$channelMember = "MB8359bc4ff425402ebffdbf8572415a7d";
//
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat channel: " . $chatChannel . ":\xA"
        . "+ channel member: " . $channelMember . ":(cat)\xA"
        ;
//
$members = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels($chatChannel)
                           ->members($channelMember)
                           ->update(array(
                                        "lastConsumedMessageIndex" => 0
                                    ));
echo "+ Updated the member index.\xA";
?>
