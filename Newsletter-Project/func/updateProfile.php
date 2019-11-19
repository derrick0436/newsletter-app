
<?php
require('../inc/class/Member.php');
session_start();

if(isset($_SESSION["id"]) & isset($_SESSION["role"])){
    if($_SESSION["role"]=="member"){
        if(!empty($_POST["name"]) & !empty($_POST["email"]) & !empty($_FILES["pic"])){
            $email = $_POST["email"];
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
                echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);
            else{
                $member = new Member();
                echo json_encode(["result"=>$member->updateProfile($_POST["name"],$_POST["email"],file_get_contents($_FILES["pic"]["tmp_name"])),"id"=>$_SESSION["id"]]);                
            }

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