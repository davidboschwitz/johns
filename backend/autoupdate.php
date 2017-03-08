<?php
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type:application/json;');
flush();

$out = [];

$out['PWD'] = shell_exec("echo \$PWD 2>&1");
$out['whoami'] = shell_exec("whoami 2>&1");
$out['pull'] = shell_exec("git pull -ff 2>&1");
$out['status'] = shell_exec("git status 2>&1");
$out['add'] = shell_exec("git add . 2>&1");
$out['commit'] = shell_exec("git commit -m 'auto update' 2>&1");
$out['push'] = shell_exec("git push static 2>&1");
$out['push'] =
<?php
echo shell_exec("git config --global user.email \"david@boschwitz.me\"");
?>

sudo -Hu www-data git config --global user.name "David Boschwitz"
echo json_encode($out);
?>
