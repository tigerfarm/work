<?php
print("+++ Test Twilio TLS version is TLSv1.2.\xA");
$response = "<TwilioResponse><Versions><Versions><Version><Name>2010-04-01</Name><Uri>/2010-04-01</Uri><SubresourceUris><Accounts>/2010-04-01/Accounts</Accounts></SubresourceUris></Version></Versions></Versions></TwilioResponse>";
echo "+ String index :" . strpos($response, "HTTP") . ":\xA";
$dom = new \DOMDocument('1.0');
$dom->preserveWhiteSpace = true;
$dom->formatOutput = true;
$dom->loadXML($response);
$xml_pretty = $dom->saveXML();
echo "+ Response :" . $xml_pretty;
