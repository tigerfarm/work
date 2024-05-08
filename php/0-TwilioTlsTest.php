<?php

// error_reporting(E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ));
// require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
require __DIR__ . '/../../twilio-php-main/srcV7x/Twilio/autoload.php';

print("+++ Test Twilio TLS version.\xA");
$client = new Twilio\Http\CurlClient();
try {
    // $response = $client->request('GET', 'https://api.twilio.com:8443');
    $response = $client->request('GET', 'https://api.twilio.com');
    if (strpos($response, "HTTP 200") !== false) {
        print("+ Test successful, TLS version is TLSv1.2.\xA");
    } else {
        print("+ Test failed, TLS version is not TLSv1.2.\xA");
    }
    // echo "+ Response:" . $response . "\xA";
    // [Response] HTTP 200 <?xml ...
    // 012345678901234567890
    $theXML = substr($response, 20);
    echo "+ The response XML:\xA";
    $dom = new \DOMDocument('1.0');
    $dom->preserveWhiteSpace = true;
    $dom->formatOutput = true;
    $dom->loadXML($theXML);
    $xml_pretty = $dom->saveXML();
    echo $xml_pretty;
} catch (exception $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}

