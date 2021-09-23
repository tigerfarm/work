<?php
echo "+++ Start.\xA";

require __DIR__ . '/../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Security\RequestValidator;
$postVars = array();
$signature = 'qP9fAU9fPEdsww1abv1FSSneWDM=';
$url = 'https://tfpecho.herokuapp.com/show?EventType=onMessageAdded&Attributes=%7B%7D&DateCreated=2021-08-12T23:54:50.674Z&Index=28&MessageSid=IM0e30471ca07642c98e69588f6c45872b&AccountSid=ACae0e356ccba96d16d8d4f6f9518684a3&Source=SDK&ClientIdentity=dave2&RetryCount=0&Author=dave2&ParticipantSid=MB54907865d0eb407c8208e228dd6a4216&Body=okay+today&ConversationSid=CHc97669141a784c92a74c296c84850d25';
$validator = new RequestValidator(getenv('MASTER_AUTH_TOKEN'));
if ($validator->validate($signature, $url, $postVars)) {
    echo "+ Confirmed to have come from Twilio.\xA";
} else {
    echo "- NOT confirmed.\xA";
}

echo "+++ Exit.\xA";