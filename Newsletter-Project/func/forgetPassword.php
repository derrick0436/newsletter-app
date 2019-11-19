<?php
require('../inc/class/Login.php');
session_start();

if(!empty($_POST["email"])){
    $login = new Login();
    echo json_encode(["result"=>$login->forgetPassword($_POST["email"]),"id"=>$_SESSION["id"]]);
}
else
echo json_encode(["result"=>"0","id"=>$_SESSION["id"]]);

?>