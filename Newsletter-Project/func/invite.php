<?php
require('../inc/class/Event.php');
session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="member"){
        if(!empty($_POST["eventid"]) & !empty($_POST["stuid"])){
            $event = new Event();
            echo json_encode(["result"=>$event->invite($_POST["stuid"],$_POST["eventid"]),"id"=>$_SESSION["id"]]);
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