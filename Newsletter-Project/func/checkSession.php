<?php
session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="member")
    echo json_encode(["result"=>"1","username"=>$_SESSION["username"],"role"=>$_SESSION["role"]]);   
    else if($_SESSION["role"]=="admin")
    echo json_encode(["result"=>"1","username"=>$_SESSION["username"],"role"=>$_SESSION["role"]]);
}
else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);
?>