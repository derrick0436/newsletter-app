<?php
require('../inc/class/Post.php');
session_start();
$post = new Post();
echo json_encode(["result"=>"1","data"=>$post->searchByMonth($_POST["month"]),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);

?>