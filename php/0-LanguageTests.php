<?php
// $ cd /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/PhpBasics
echo "\xA+++ Language tests.\xA";
echo "\xA+ Current directory: ", getcwd();
echo "\xA+ __DIR__: ", __DIR__;
echo "\xA";
date_default_timezone_set('UTC');
echo "\xA+ Date today: " . date('Y-m-d');   // 2018-08-24
echo "\xA+ Time      : " . date("h:i:sa");
echo "\xA";

$myObj->name = "John";
$myObj->age = 30;
$myObj->city = "New York";
$myJSON = json_encode($myObj);
echo "\xA+ JSON : " . $myJSON;
//
// + JSON : {"name":"John","age":30,"city":"New York"}
//
$myArr = array("John", "Mary", "Peter", "Sally");
$myJSON = json_encode($myArr);
echo "\xA+ JSON : " . $myJSON;
echo "\xA";

;?>
