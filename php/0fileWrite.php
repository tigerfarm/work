<?php
$theFilename = "0fileWrite.txt";
echo '+++ Write to file', $theFilename, "\xA";
$theFile = fopen($theFilename, "w");
fwrite($theFile, "+ Top of file.\xA");
$totalLines = 0;
for ($i = 1; $i <= 10; $i++) {
    $theLine = "++ " . $i . "\xA";
    fwrite($theFile, $theLine);
    $totalLines++;
}
fwrite($theFile, "+ Total lines written = " . $totalLines . "\xA");
fclose($theFile);
echo "+++ Total lines written = " . $totalLines . "\xA";
?>
