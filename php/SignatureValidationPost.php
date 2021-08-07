<?php
echo "+++ Start.\xA";

require __DIR__ . '/../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Security\RequestValidator;
$token = getenv('MASTER_AUTH_TOKEN');
// Data order matters with PHP. In Node, data order didn't matter.
// + URL components : GET / ? "body=rbody"
$postVars = array(
 'body' => 'rbody'
);
$validator = new RequestValidator($token);
$signature = 'wTa+EyMTNgOCq2ysornj5h8M1pA=';
$url = 'https://tfpecho.herokuapp.com/show';
if ($validator->validate($signature, $url, $postVars)) {
    echo "Confirmed to have come from Twilio.\xA";
} else {
    echo "NOT VALID.\xA";
}

echo "+++ Exit.\xA";