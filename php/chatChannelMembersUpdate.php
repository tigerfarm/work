<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = getenv('CHAT_SERVICE_SID');
$chatChannel = "CH7b54dec11cea4fd38b189de6af8b03a2";       // abc
$channelMember = "MB1aad1e8d84fe4b74bb9273d3e1197cac"; // cat
//
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
        . "+ Chat channel: " . $chatChannel . ":\xA"
        . "+ channel member: " . $channelMember . ":(cat)\xA"
        ;
$memberObj->fn = "Cat";
$memberObj->ln = "There";
$memberJSON = json_encode($memberObj);
echo "+ member attributes: " . $memberJSON . ":\xA";
//
$members = $twilio->chat->v2->services($CHAT_SERVICE_SID)
                            ->channels($chatChannel)
                           ->members($channelMember)
                           ->update(array(
                                        "attributes" => $memberJSON
                                    ));
echo "+ Updated the member.\xA";
?>
