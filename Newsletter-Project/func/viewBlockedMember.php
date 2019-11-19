<?php
require('../inc/class/Member.php');

session_start();
if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="admin"){
        $member = new Member();
        echo json_encode(["result"=>"1","data"=>$member->viewBlockedMember(),"id"=>$_SESSION["id"],"role"=>$_SESSION["role"]]);
    }
    
}
else
    echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
?>