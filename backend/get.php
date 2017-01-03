<?php
header('Access-Control-Allow-Origin: david.boschwitz.me');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type:application/json;')
echo file_get_contents('shows.json');
 ?>
