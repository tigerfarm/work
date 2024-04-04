<?php
echo "+++ Echo HTTP request data.\xA";

$requestType = $_SERVER['REQUEST_METHOD'];
if ($requestType == "GET") {
    $theArray = $_GET;
} elseif ($requestType == "POST") {
    $theArray = $_POST;
} else {
    echo "+ Request type not GET or POST.\xAExit.\xA";
    return;
}

$writefilename = "echo";
echo "+ URL: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI'] . " " .  "\xA";
foreach($theArray as $key=>$value){
   echo '++ ' . $key . ' => ' . $value . "\xA";
   if ($key == "writesuffix") {
       $writefilename = $writefilename . "-" . $value;
   }
}
echo "+ End of list.\xA";
$writefilename = $writefilename . ".txt";
echo "+ writefilename |" . $writefilename . "|\xA";

$fp = fopen($writefilename, 'w');
fwrite($fp, '+++ Echo HTTP request data.');
fwrite($fp, "\xA");
fwrite($fp, "+ URL: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI'] . " " .  "\xA" );
foreach($theArray as $key=>$value){
   fwrite($fp, '++ ' . $key . ' => ' . $value . "\xA");
}
fwrite($fp, "+ End of list.\xA");
fclose($fp);
?>