<?php
echo "\xA+++ Turn off deprecated errors in PHP.\xA";
echo "\xA";

error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );

;?>
