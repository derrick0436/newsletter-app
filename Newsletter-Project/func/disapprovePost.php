<?php
require('../inc/class/Post.php');

session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="admin"){
        if(isset($_POST["id"])){
        $post = new Post();
        echo json_encode(["result"=>$post->disapprovePost($_POST["id"]),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);            
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