<?php

echo '++ Echo URL: ', $echoUrl, "\xA";
$msgFrom = htmlspecialchars($_GET["msgFrom"]);
if ($msgFrom == "") {
    $msgFrom = $argv[1];
    if ($msgFrom == "") {
        echo '-- Required parameter: msgFrom.';
        return;
    }
}
echo '++ Send SMS messsage, From: ' . $msgFrom . ":\xA";
?>
