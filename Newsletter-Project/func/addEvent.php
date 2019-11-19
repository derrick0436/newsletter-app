<?php
require('../inc/class/Event.php');
session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="admin"){
        if(!empty($_POST["title"]) && !empty($_POST["content"]) && !empty($_POST["category"]) && !empty($_POST["venue"]) && !empty($_POST["time"]) && !empty($_POST["date"])){
            $event = new Event();
            $data = $event->addEvent($_POST["title"],$_POST["content"],$_POST["category"],$_POST["venue"],$_POST["time"],$_POST["date"]);            
            
            $last_id = $event->last_id();
            
            
            $event->clearPic($_POST["id"]);
            for($i=0;$i<count($_FILES["upload_pic"]["name"]);$i++)
            {
                $uploadfile=file_get_contents($_FILES["upload_pic"]["tmp_name"][$i]);
                $event->uploadPic($last_id,$uploadfile);
            }     
            
            echo json_encode(["result"=>$data,"id"=>$_SESSION["id"]]);
        }
        else
        echo json_encode(["result"=>"0-2","id"=>$_SESSION["id"]]);
    }
    else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
}
else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
?>