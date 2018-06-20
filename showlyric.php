<?php
$lryicsrc=$_GET["value"];
$myfile = fopen(iconv ( 'UTF-8', 'GBK', 'upload/'.$lryicsrc.'.lrc' ), "r");
$mylryic=fread($myfile,filesize(iconv ( 'UTF-8', 'GBK', 'upload/'.$lryicsrc.'.lrc' )));
fclose($myfile);
echo($mylryic);
?>