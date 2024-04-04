<?php
echo "+++ Start\xA";
$asid = getenv('ACCOUNT_SID');
if ($asid == "") {
    echo "-- Error: ACCOUNT_SID not defined \xA";
} else {
    echo "+ ACCOUNT_SID: " . $asid . "\xA";
}
echo "+++ Exit.\xA";
?>
