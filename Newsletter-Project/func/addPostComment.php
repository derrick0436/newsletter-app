<?php
require('../inc/class/Post.php');
session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="member"){
        if(!empty($_POST["id"]) & !empty($_POST["text"])){
            $post = new Post();
            echo json_encode(["result"=>$post->addPostComment($_POST["id"],$_POST["text"]),"id"=>$_SESSION["id"]]);
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