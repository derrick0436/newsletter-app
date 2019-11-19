<?php
require('../inc/class/Post.php');

session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="admin" || $_SESSION["role"]=="member"){
        $post = new Post();
        echo json_encode(["result"=>"1","data"=>$post->getAllCategory(),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);
    }
    
}
else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
?>