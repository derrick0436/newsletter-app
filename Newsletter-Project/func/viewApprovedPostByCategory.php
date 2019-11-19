<?php
require('../inc/class/Post.php');
session_start();
$post = new Post();
echo json_encode(["result"=>"1","data"=>$post->searchByCategory($_POST["categoryId"]),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);

?>