
<?php
require('../inc/class/Event.php');

session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="admin"){
        if(isset($_POST["id"])){
        $event = new Event();
        echo json_encode(["result"=>$event->deleteEvent($_POST["id"]),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);            
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