<?php
echo "\xA+++ Date tests.\xA";
//
// http://php.net/manual/en/timezones.php
//
date_default_timezone_set('UTC');
echo "\xA+ Date today UTC: " . date('Y-m-d');           // 2018-08-24
echo "\xA+ Time          : " . date("H:i:sa");
date_default_timezone_set('America/Los_Angeles');
echo "\xA+ Date today PDT: " . date('Y-m-d');           // 2018-08-24
echo "\xA+ Time          : " . date("H:i:sa");
echo "\xA= Sample date   : " . date('l jS \of F Y h:i:s A');
echo "\xA\xA";
echo "\xA+ Date today PDT: " . date('Y-m-d H:i:sa');    // 2018-08-24
$nowStamp = mktime(0,0,0,date("m"),date("d"),date("Y"));
echo "\xA+ nowStamp->format   : ". $nowStamp;                     // Timestamp: 1535353200
$now = new DateTime('now');
echo "\xA+ now->format   : ". $now->format('Y-m-d H:i:s');
//
$date = new DateTime('2001-02-03 04:05:06');
echo "\xA+ date->format  : ". $date->format('Y-m-d H:i:s');
echo "\xA\xA";

$todayStart = date('Y-m-d') + ' 00:00:00';  // date('2018-08-24 00:00:00')
$date1 = new DateTime($todayStart);
echo "\xA+ todayStart    : " . $date1->format('Y-m-d H:i:s');

$todayEnd = date('Y-m-d') + ' 21:59:59';    // date('2018-08-24 21:59:59')
$date2 = new DateTime($todayEnd);
echo "\xA+ todayEnd      : " . $date2->format('Y-m-d H:i:s');

echo "\xA\xA";
?>
