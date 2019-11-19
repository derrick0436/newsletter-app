<?php
require('../inc/class/Member.php');

session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="admin"){
        if(isset($_POST["id"])){
        $member = new Member();
        echo json_encode(["result"=>$member->approveMember($_POST["id"]),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);            
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