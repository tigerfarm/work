<?php
// Requires a local SMTP server.
$to = "tigerfarm@gmail.com";
echo "+ Send an email message to: " . $to . "\xA";
$headers = "From: dthurston@twilio.com";
$subject = "Subject message"; 
$message = "The message body."; 
mail($to, $subject, $message, $headers); 
echo "+ Sent.\xA";
?>
