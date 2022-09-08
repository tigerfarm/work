<?php
$theFilename = "0fileWrite.txt";
echo '+++ Read file: ', $theFilename, "\xA";
$myfile = fopen($theFilename, "r") or die("- Error, Unable to open the file" . $theFilename. "\xA");
$fileText = fread($myfile,filesize($theFilename));
echo "+ File text :" . $fileText . ":\xA";
fclose($myfile);
echo "+++ Exit.\xA";
?>
