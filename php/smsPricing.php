<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$country = "FR";
echo '++ Check for country: ' . $country . ":\xA";
$country = $client->pricing->v1->messaging
                               ->countries($country)
                               ->fetch();
echo "+ Country URL:       " . $country->url . "\xA";
echo "+ Country priceUnit: " . $country->priceUnit . "\xA";
echo "+ Country URL: " . $country->inboundSmsPrices[0] . "\xA";
echo "+ outboundSmsPrices BasePrice: " . $country->outboundSmsPrices . "\xA";
foreach ($country->outboundSmsPrices as $address) {
    echo "items:". $address['carrier'] ."\n";
}
// Use the following to print the complete data.
// print_r($country);

/*
 * From: https://www.twilio.com/docs/sms/api/pricing
{
  "country": "country",
  "inbound_sms_prices": [
    {
      "base_price": "0.05",
      "current_price": "0.05",
      "number_type": "mobile"
    }
  ],
  "iso_country": "EE",
  "outbound_sms_prices": [
    {
      "carrier": "att",
      "mcc": "foo",
      "mnc": "bar",
      "prices": [
        {
          "base_price": "0.05",
          "current_price": "0.05",
          "number_type": "mobile"
        }
      ]
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v1/Messaging/Countries/US"
}
 */
