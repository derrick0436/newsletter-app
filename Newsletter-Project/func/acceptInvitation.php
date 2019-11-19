<?php
require('../inc/class/Event.php');
session_start();
$event = new Event();
echo json_encode(["result"=>$event->approveInvitation($_POST["fromUser"],$_POST["toUser"],$_POST["event_id"]),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);
?>