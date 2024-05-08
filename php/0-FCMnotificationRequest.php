<?php
// Incomplete and untested.

$firebaseToken = $deviceToken;

$SERVER_API_KEY = getenv('FCM_SERVER_KEY');
echo "+ FCM server key: ", $SERVER_API_KEY, "\xA";

$data = [
    "to" => $firebaseToken,
    "notification" => [
        "title" => $notificationTitle,
        "body" => $notificationMessage,
        "image" => $companyLogo,
        "url" => $actionURL,
    ]
];
$dataString = json_encode($data);

$headers = [
    'Authorization: key=' . $SERVER_API_KEY,
    'Content-Type: application/json',
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);

$response = curl_exec($ch);

echo "+ End of list.\xA";

