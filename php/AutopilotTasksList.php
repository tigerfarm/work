<?php
// Documentation: https://www.twilio.com/docs/chat/rest/user-resource
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
//
$ASSISTANT_SID = 'UA96376fff94c83ea0349a3f97651f4f77';
echo '+ ASSISTANT_SID: ' . $ASSISTANT_SID . ":\xA"
        ;
$tasks = $twilio->autopilot->v1->assistants($ASSISTANT_SID)
                               ->tasks
                               ->read(20);
foreach ($tasks as $task) {
    echo "++ User, SID: " . $task->sid
        .", friendlyName: " . $task->friendlyName
        . "\xA";
}

?>



brightness_4
<?php 
  
// Initialize a file URL to the variable 
$url = 'https://contribute.geeksforgeeks.org/wp-content/uploads/gfg-40.png'; 
  
// Use basename() function to return the base name of file  
$file_name = basename($url); 
   
// Use file_get_contents() function to get the file 
// from url and use file_put_contents() function to 
// save the file by using base name 
if(file_put_contents( $file_name,file_get_contents($url))) { 
    echo "File downloaded successfully"; 
} 
else { 
    echo "File downloading failed."; 
} 
  
?> 
