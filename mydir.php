<?php
    $files = array();
    if(@$handle = opendir('./upload')) { //注意这里要加一个@，不然会有warning错误提示：）
        while(($file = readdir($handle)) !== false) {
            if($file != ".." && $file != ".") { //排除根目录；
                if(end(explode(".",$file)) !== 'lrc') {
                    $files[] = iconv('gb2312','utf-8',$file);
                }
            }
        }
        closedir($handle);
        echo json_encode($files);
    }
?>