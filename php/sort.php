<?php

function sortArray($theArray) {
    $arrlength = count($theArray);
    // echo "\xA+ arrlength = " . $arrlength;
    for ($h = 0; $h < $arrlength - 1; $h++) {
        $low = $h;
        $lowItem = $theArray[$low];
        for ($i = $h; $i < $arrlength - 1; $i++) {
            if ($lowItem > $theArray[$i + 1]) {
                $low = $i + 1;
                $lowItem = $theArray[$low];
            }
        }
        $theArray[$low] = $theArray[$h];
        $theArray[$h] = $lowItem;
        // echo "\xA+ h=" . $h . " low=" . $low . " lowItem=" . $lowItem;
    }
    return $theArray;
}

$arNumbers = array(
    getenv('PHONE_NUMBER_4'),
    getenv('PHONE_NUMBER_3'),
    getenv('PHONE_NUMBER_2'),
    getenv('PHONE_NUMBER_1'),
);
$arrlength = count($arNumbers);
//
echo '++ Account phone numbers:';
for ($i = 0; $i < $arrlength; $i++) {
    echo "\xA" . $arNumbers[$i];
}
//
$sortNumbers = sortArray($arNumbers);
sort($arNumbers);   // Didn't work on Heroku.
//
echo "\xA++ Sorted by sort:";
for ($i = 0; $i < $arrlength; $i++) {
    echo "\xA" . $arNumbers[$i];
}
echo "\xA++ Sorted by sortArray:";
for ($i = 0; $i < $arrlength; $i++) {
    echo "\xA" . $sortNumbers[$i];
}
echo "\xA+ End of List.\xA";
?>
