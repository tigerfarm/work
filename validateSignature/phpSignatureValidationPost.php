<?php
echo "+++ Start.\xA";

require __DIR__ . '/../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Security\RequestValidator;
$postVars = array(
 'body' => 'rbody'
);
$signature = 'wTa...1pA=';
$url = 'https://example.herokuapp.com/show';
$validator = new RequestValidator(getenv('MASTER_AUTH_TOKEN'));
if ($validator->validate($signature, $url, $postVars)) {
    echo "+ Confirmed to have come from Twilio.\xA";
} else {
    echo "- NOT confirmed.\xA";
}

echo "+++ Exit.\xA";