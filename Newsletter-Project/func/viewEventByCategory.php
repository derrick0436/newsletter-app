<?php
require('../inc/class/Event.php');
session_start();
$event = new Event();
echo json_encode(["result"=>"1","data"=>$event->searchByCategory($_POST["categoryId"]),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);
?>