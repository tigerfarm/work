<?php
// Program to download an MMS media file.
// Given an MMS SID and the ME media file id, download the media file.
// Note each ME media file id has a 4 hour expiration window.

class HTTPRequester {

    // From: https://stackoverflow.com/questions/66771025/save-a-copy-of-any-attachments-included-with-an-incoming-sms-via-twilio
    public function getMediaContent($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // Option to follow the redirects, otherwise it will return an XML
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $media = curl_exec($ch);
        curl_close($ch);
        return $media;
    }

}

echo "+++ Start.\xA";

// Use a Twilio MMS media file URL, to download the media file to a local disk file.
// ---
// Use the following to send an MMS:
// $ php smsSendMmsSingle.php
// + Sent, SID: MMdb6a8e05fcac48dc823874b6db03445a
// ---
// Get the Media ME id from the Twilio Console SMS log: https://www.twilio.com/console/sms/logs
// Or
// $ php smsListMessageMms.php 
// + Sent, SID:MMdb6a8e05fcac48dc823874b6db03445a To:+16505552222 Status:delivered MediaUrl0: 1
// + Media id: ME2458b013013432076b041812bec916dc
// Or from a webhook: {...,"SmsMessageSid":"MM0888aad8ca4ab5c698a58ecc6e6c96f9","MediaContentType0":"image/jpeg","MediaUrl0":"https://api.twilio.com/2010-04-01/Accounts/ACa...3/Messages/MM0888aad8ca4ab5c698a58ecc6e6c96f9/Media/ME7d57db8c0196a2f45d3da1d5ad496910",...} 
// 
$theMmsMmSid = "MMf28ecbfbfd8c8964f89ae523e6f83d65"; // MMf28ecbfbfd8c8964f89ae523e6f83d65 MM840711a306a13165e8e832426e8f718a
$theMmsMeSid = "ME390dbc2eaee42e49e42fca2da68ca29f"; // ME390dbc2eaee42e49e42fca2da68ca29f ME1f1a0a45e0936ede1b2bfa19d21c374e
//
// The following does not have account SID and auth token for access.
// $theUri = 'https://api.twilio.com/2010-04-01/Accounts/';
// The following does have account SID and auth token for access.
$theUri = 'https://' . getenv('MAIN_ACCOUNT_SID') . ':' . getenv('MAIN_AUTH_TOKEN') . '@api.twilio.com/2010-04-01/Accounts/';
//
// echo "+ $theUri \xA";
$mmsMedia = $theUri . getenv('MAIN_ACCOUNT_SID') . '/Messages/' . $theMmsMmSid . '/Media/' . $theMmsMeSid;
//
echo "+ $mmsMedia \xA";
//
$http = new HTTPRequester();
$mmsFileContent = $http->getMediaContent($mmsMedia);
$mmsMediaFilenameWrite = "httpsMmsMediaUrl.jpg";
$mmsFileWrite = fopen($mmsMediaFilenameWrite, 'w');
fwrite($mmsFileWrite, $mmsFileContent);

echo "+++ Exit.\xA";
