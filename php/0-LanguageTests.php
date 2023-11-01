<?php
// $ cd /Users/dthurston/2017m/tfpWebsite/docroot/tech/booksJava/projects/PhpBasics
echo "\xA+++ Language tests.\xA";
echo "\xA";

//    + String index :11:
//                                01234567890123
echo "+ String index :" . strpos("[Response] HTTP 200", "HTTP") . ":\xA";
echo "\xA";

$anArray = split(" ", "hello over there, okay.");
echo "Third = " . $anArray[2] . "\xA";
foreach ($anArray as $eachOne) {
    echo "\xA" . $eachOne;
}
echo "\xA";
echo substr('abcdef', 1);     // bcdef
echo substr('abcdef', 1, 3);  // bcd
echo "\xA";

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
