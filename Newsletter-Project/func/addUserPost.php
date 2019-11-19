<?php
require('../inc/class/Post.php');
session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="member"){
        if(!empty($_POST["title"]) & !empty($_POST["category"]) & !empty($_POST["content"]) & !empty($_FILES["pic"])){
            $post = new Post();
            echo json_encode(["result"=>$post->addPost($_POST["title"],$_POST["category"],$_POST["content"],file_get_contents($_FILES["pic"]["tmp_name"])),"id"=>$_SESSION["id"]]);
        }
        else
        echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
    }
    else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
}
else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
?>