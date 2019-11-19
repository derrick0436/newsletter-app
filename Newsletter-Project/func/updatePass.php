
<?php
require('../inc/class/Member.php');
session_start();

if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="member"){
        if(!empty($_POST["new-pass"]) & !empty($_POST["old-pass"])){
            $member = new Member();
            echo json_encode(["result"=>$member->updatePass($_POST["new-pass"],$_POST["old-pass"]),"id"=>$_SESSION["id"]]);                

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