<?php
  if($_SERVER["REQUEST_METHOD"] == 'GET'){
  }else if($_SERVER["REQUEST_METHOD"] == 'POST'){
      upload();
  }else{
      exit("<strong>非法访问</strong>");
  }
  function upload(){
    uploadFile('file_upload');
    $lyric = $_POST['edit_lyric'];
    $title = $_POST['title'];
    $artist = $_POST['artist'];
    $txt = "[ti:$title]\n[ar:$artist]\n".$lyric;
    $path = "upload/".$artist." - ".$title .".lrc";
    $myfile = fopen(iconv ( 'UTF-8', 'GBK', $path ),"w");//编码转换
    fwrite($myfile, $txt);
    fclose($myfile);
  }
function uploadFile($fileField,$artworkID = 0){
    $upfile = "";
    $files = $_FILES[$fileField];
    $fileName = $files['name'];
    $fileType = $files["type"];
    //获取临时文件的文件名
    $fileTemp = $files['tmp_name'];
    if($fileName != "" and $fileTemp != "" and $fileType != ""){
        if(allowType($fileType)){
            //获取文件大小
            $upfile["filesize"] = filesize($fileTemp);
            //创建文件夹，将上传的文件保存到新创建的文件夹中
            $filePath = "upload/"; //设置文件路径
            //获取文件扩展名
            $fileExtendedName = getExtendedName($fileName);
            //生成图片的名字
            //设置新的文件名称，以保证上传的文件不重名
            $newFileName = $fileName;
            //使用move_uploaded_file()函数，将上传的临时文件保存到服务器指定的路径返回状态
            $upfile["filename"] = $newFileName;
            $upfile["filetype"] = $fileType;
            if(file_exists($filePath . $newFileName)){
                unlink($filePath . $newFileName);
            }
            $upfile["filestat"] = @move_uploaded_file($fileTemp, iconv ( 'UTF-8', 'GBK', $filePath . $newFileName )) ? "true" : "false";
            header("Location:lab11.html");
        }else{
            $upfile["filename"] = "非法的文件类型。";
            $upfile["filestat"] = "false";
        }
    }else{
        $upfile["filename"] = "无效的文件数据。";
        $upfile["filestat"] = "false";
    }
    return $upfile;
}
//获取文件后缀名
function getExtendedName($fileName){
    return end(explode(".",$fileName));
}
//文件类型验证
function allowType($type){
    //设置不允许上传的文件类型数组
    $types = array('application/x-js','application/octet-stream','application/x-php','text/html');
    if(in_array($type,$types)){
        return false;
    }else{
        return true;
    }
}
?>