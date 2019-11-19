<?php
require('../inc/class/Login.php');
if(!empty($_POST['action'])){
    if($_POST['action'] == "login")
    {
        if(!empty($_POST['role'])){
            $login = new Login($_POST['uname'],$_POST['uname'],$_POST['pass']);
            if($_POST['role'] == "member"){
                if($login->checkMember() == 0){
                    echo json_encode(["result"=>0, "message"=>"Account Not Approved or Blocked By Admin!/Wrong Credentials!"]);
                }
                else if($login->checkMember() == 1){
                    
                    if($login->login($_POST['role']) == 1)
                    echo json_encode(["result"=>1,"id"=>$_SESSION["id"]]);
                    else
                    echo json_encode(["result"=>0,"id"=>$_SESSION["id"],"message"=>"Account Not Approved or Blocked By Admin!/Wrong Credentials!"]);                     
                }
            }
            else if($_POST['role'] == "admin"){
                echo json_encode(["result"=>$login->login($_POST['role']),"id"=>$_SESSION["id"]]);
            }
            
        }
    }
    else if($_POST['action'] == "logout")
    {
        $login = new Login();
        $login->logout();
        echo json_encode(["result"=>1, "id"=>$_SESSION["id"]]);        
    }
    else if($_POST['action'] == "register"){
        $login = new Login($_POST['stu_id'],$_POST['uname'],$_POST['pass'],$_POST['email']);
        if($login->checkRegistered()==0)
        echo json_encode(["result"=>$login->register()]);        
        else
        echo json_encode(["result"=>0,"message"=>"StudentID/Username Registered Before!"]);  
    }
}



// function roleChecking($role) {
//     if($role == "member") 
// }

?>