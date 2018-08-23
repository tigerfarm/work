<?php
/**
 * PHP Template.
 */

?>
<h2>PHP Request Helper</h2>
<h4>Information Included in Post</h4>
<p>
<?php

// Iterate through values
foreach (array_keys($_POST) as $field){
  echo "Field name -  " . $field . " : " . $_POST[$field] . "<br/>";
}


?>
</p>

<h4>Server Data</h4>
<?php

// Iterate through values
foreach (array_keys($_SERVER) as $field){
  echo "Field -  " . $field . " : " . $_SERVER[$field] . "<br/>";
}


?>


<h4>Env Data</h4>
<?php

// Iterate through values
foreach (array_keys($_ENV) as $field){
  echo "Field -  " . $field . " : " . $_ENV[$field] . "<br/>";
}


?>
