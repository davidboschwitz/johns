<?php
if($_GET['p'] == 'shows'){
    $myfile = fopen("shows.json", "w") or die("Unable to open file!");
    fwrite($myfile, $_POST['data']);
    fclose($myfile);
    echo 'looks like that probably worked';
} else if ($_GET['p'] == 'lyrics'){
    $myfile = fopen("lyrics.json", "w") or die("Unable to open file!");
    fwrite($myfile, $_POST['data']);
    fclose($myfile);
    echo 'looks like that probably worked';
} else {
  echo 'poop you';
}
 ?>
