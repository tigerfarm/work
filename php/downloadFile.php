<?php
echo "+++ Start.\xA";

// MMS request:
// +++ Echo HTTP request data.
// + URL: POST /cgi/echo.php 
// ++ MediaContentType0 => image/jpeg
// ++ MessageSid => MM07bf9ce26173e745c73420be98250fc5
// ++ NumMedia => 1
// ++ Body => Cat
// ++ MediaUrl0 => https://api.twilio.com/2010-04-01/Accounts/AC1...d/Messages/MM07bf9ce26173e745c73420be98250fc5/Media/ME2704ed5998f7941b1cef38097e33131c
// ...
// + End of list.
//
// The MediaUrl0 value, forwards to the following:
// $theUrl = "https://s3-external-1.amazonaws.com/media.twiliocdn.com/AC1...d/def1069d2a15ce1f3ac9d59f0bea3c31";
// $outFilename = "downloadFileJPG.jpg";
//
// Didn't work:
$theUrl = urldecode('https://media.twiliocdn.com/fax/ACa...3/e6ec88730abf647857171b943e8aa2ace7149471ee4277396c7aa04c299fc0b79ea899a0a4ece20420fa9b8e23c39cb4bc9fafc3fe2019cce56f408af827ef24?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLWVhc3QtMSJIMEYCIQC7uozx5L1Bgjm4%2FCYEdN0l8BUYdADIsk51wlamVzwzggIhAKjDh0278s50BYizUnva28MdF2IaT71T4%2FF%2FU6oS8EjOKr0DCMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjAxMTY0OTIxNDA4IgzmpJq76F6MRBUnNGMqkQMcJ8jw24ITKNwmGkP1q%2Fa%2Bb%2FgM5CqjX9ir%2BVI4BKNrQz6NnYWUsO2vcj5%2F67Gk1RNimv2Bkok9FLt1XipdarD4rYZt1ZQLruLguh9T8cStX1d1ZtNnus8BvZE0srGC7W1AaHNLYhVid6EZeRcM%2FlKqvQQs%2BdhUGUNyMoR9hWCxvt4I%2Fw98WPnE%2BzYx3awB1%2BPi09uxE12svajy7kvhmv6sK3t9G%2BKlOJVaN6Nw3uQk%2BfDZunzjF3WAvImETwDNc%2Fo2hxorR73iZnNBXDQn3hVeaOAOKRWU%2FfW3rH3emkJXVypQMCizmLPnZ1z5GqTTnqM5pfb15wRAtMN%2BxqhGcTl3WeMp3LEWM%2FDdoCjtZaVVY%2Fl726ejYj9hiYCoOwoGrFTy087tdVoXwvbPcJnsx%2F6enxxhUnM1JqopOmqz98GPMXvSwIA77M4fOK4%2F1buF06EnA35Zukyi21vYpLo7l0f5x4EQfI5UB%2FzM4RCefucxAFCMyY9zLQG16S1n9LFeC6WWaxYYPExqVkCnROJDtrDtxjCinLv9BTrqAc4zCtVor%2Banh8e%2BnmJ7eIIx2Rr%2B3KeQPYq1WEZDJPzzaLNqrY2BOYreMIo6eHCauDVZEA5xl31URyNNK42oJd8CLq7zAGdUN6aRNfJ8Odtz1sq6h9RLFDF3O8v1AKzLZYab28DBl5F5lxSFfnzTHmJZQ4SOtHqBjkiLZC8xUv%2FpRKx5kM7Eu0Edz5Y1mACjxRiLkAcMN0MO%2FcXxaiJWagnhBwz2QhzzTHNpPurcjY6OW0FmxytrQb87tVdtz0RjnrH0%2Bwzel4QfXLvq5p6p6oplsrdIfPlKHIUM2TCw%2BBKintUP9KVYTf5x7g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201113T184804Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=ASIAS5VS5DJALYQWCX6P%2F20201113%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=08f67aa6ede01fcd68aff408be2ecb4c8afd66c914d2d42f1e8dc01703e2250c');
$outFilename = "downloadFilePDF.pdf";
// curl https://your-domain/file.pdf
// curl https://about-time-2357.twil.io/assets/HealthIns1.pdf
//
$ch = curl_init($theUrl);
$fp = fopen($outFilename, 'wb');
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
fclose($fp);
echo "+ File created: " . $outFilename . "\xA";
 
echo "+++ Completed.\xA";

