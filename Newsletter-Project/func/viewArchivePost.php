<?php
require('../inc/class/Post.php');

session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="admin"){
        $post = new Post();
        echo json_encode(["result"=>"1","data"=>$post->viewArchivePost(),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);
    }
    
}
else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
?>