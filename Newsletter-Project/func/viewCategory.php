<?php
require('../inc/class/Category.php');
session_start();
$category = new Category();
echo json_encode(["result"=>"1","data"=>$category->viewCategory(),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);
?>