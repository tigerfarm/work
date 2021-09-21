<?php
echo "+++ Start.\xA";

require __DIR__ . '/../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Security\RequestValidator;
$postVars = array();
$signature = 'no4J...oP2A=';
$url = 'https://example.herokuapp.com/show?body=rbody';
$validator = new RequestValidator(getenv('MASTER_AUTH_TOKEN'));
if ($validator->validate($signature, $url, $postVars)) {
    echo "+ Confirmed to have come from Twilio.\xA";
} else {
    echo "- NOT confirmed.\xA";
}

echo "+++ Exit.\xA";