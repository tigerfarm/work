<?php
echo "\xA+++ Echo environment variables.";
//
$accountSid = getenv("ACCOUNT_SID");
$authToken = getenv('AUTH_TOKEN');
echo "\xA", "+ ACCOUNT_SID        : ", $accountSid;
echo "\xA", "+ AUTH_TOKEN         : ", $authToken;
//
require __DIR__ . '/../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
echo "\xA", "+ Twilio PHP helper library works.";
//
echo "\xA", "+ TOKEN_HOST         : ", getenv('TOKEN_HOST');
//
$notifyServieSid = getenv('NOTIFY_SERVICE_SID');
$syncServieSid = getenv('SYNC_SERVICE_SID');
$syncMapName = getenv('SYNC_MAP_NAME');
echo "\xA", "+ NOTIFY_SERVICE_SID : ", $notifyServieSid;
echo "\xA", "+ SYNC_SERVICE_SID   : ", $syncServieSid;
echo "\xA", "+ SYNC_MAP_NAME      : ", $syncMapName;
//
echo "\xA", "+ PHONE_NUMBER1      : ", getenv('PHONE_NUMBER1');
echo "\xA", "+ PHONE_NUMBER2      : ", getenv('PHONE_NUMBER2');
echo "\xA", "+ PHONE_NUMBER3      : ", getenv('PHONE_NUMBER3');
echo "\xA", "+ PHONE_NUMBER4      : ", getenv('PHONE_NUMBER4');
echo "\xA", "+ PHONE_NUMBER5      : ", getenv('PHONE_NUMBER5');
echo "\xA", "+ PHONE_NUMBER6      : ", getenv('PHONE_NUMBER6');
//
echo "\xA", "+ SENDGRID_API_KEY   : ", getenv('SENDGRID_API_KEY');
echo "\xA", "+ EMAIL_DT           : ", getenv('EMAIL_DT');
echo "\xA", "+ EMAIL_TF           : ", getenv('EMAIL_TF');
//
echo "\xA", "+ CHAT_SERVICE_SID   : ", getenv('CHAT_SERVICE_SID');
echo "\xA", "+ CHAT_API_KEY       : ", getenv('CHAT_API_KEY');
echo "\xA", "+ CHAT_API_KEY_SECRET: ", getenv('CHAT_API_KEY_SECRET');
//
$via = "sms";
$authyPhoneNumber = getenv("AUTHY_PHONE_NUMBER1");
$authyCountryCode = getenv('AUTHY_PHONE_COUNTRYCODE');
echo "\xA", "+ AUTHY_API_KEY           : ", getenv('AUTHY_API_KEY');
echo "\xA", "+ AUTHY_ID                : ", getenv('AUTHY_ID');
echo "\xA", "+ AUTHY_ID_EMAIL          : ", getenv('AUTHY_ID_EMAIL');
echo "\xA", "+ AUTHY_PHONE_COUNTRYCODE : ", $authyCountryCode;
echo "\xA", "+ AUTHY_PHONE_NUMBER1     : ", $authyPhoneNumber;

echo "\xA+++ Exit \xA";
?>
