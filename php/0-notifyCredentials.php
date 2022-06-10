<?php
// Couldn't get this to work, error message: Could not parse certificate.

error_reporting(E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ));
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
//
echo "\xA---------------------------------\xA";
echo "\xA+ Start.\xA";
$aCert = "-----BEGIN CERTIFICATE-----
ABC...DEF=
-----END CERTIFICATE-----";

$credential = $twilio->notify->v1->credentials
        ->create(
    "apn",[
    "friendlyName" => "apncr1",
       "certificate" => $aCert,
    "privateKey" => "-----BEGIN RSA PRIVATE KEY-----MIIEpQIBAAKCAQEAuyf/lNrH9ck8DmNyo3fGgvCI1l9s+cmBY3WIz+cUDqmxiieR\n.-----END RSA PRIVATE KEY-----",
    "sandbox" => true,
        ]);
print("+ APN credential SID: " . $credential->sid);
echo "\xA+ Exit.\xA";

// eof
