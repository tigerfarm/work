<?php
echo "+++ Start.\xA";
require __DIR__ . '/../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Security\RequestValidator;
//
$validator = new RequestValidator(getenv('MAIN_AUTH_TOKEN'));
//
$signature = 'p9asdljeafoijawljfeiaelfjsa=';
$url = 'http://example.com/studio?bodySHA256=12345fd62d0edbf5034ee40ec14c210d230f87642535e25461e123465c545057';
$postVars = array();
if ($validator->validate($signature, $url, $postVars)) {
    echo "Confirmed to have come from Twilio.\xA";
} else {
    echo "NOT VALID.\xA";
}
echo "+++ Exit.\xA";

// https://www.twilio.com/docs/usage/security#notes
// If the Content-Type is application-json, don't use the JSON body to fill in the validator's param for POST parameters.
// + The query parameter bodySHA256 will be included in the request.
// + Its value is calculated as the hexadecimal representation of the SHA-256 hash of the request body.
