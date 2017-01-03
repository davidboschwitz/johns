<?php
header('Access-Control-Allow-Origin: david.boschwitz.me');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type:application/json;');

if($_GET['p'] == 'shows')
    echo file_get_contents('shows.json');
else if($_GET['p']=='lyrics')
    echo file_get_contents('lyrics.json');
else
    echo '{"error":"poop you"}';
 ?>
