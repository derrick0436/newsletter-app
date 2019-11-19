<?php
require('DatabaseHandler.php');

class Login {
    private $student_id = "";
    private $username = "";
    private $pass = "";
    private $email = "";
    
    private $db = null;
    
    public function __construct($stu_id = null, $uname = null, $pass = null, $email = null) {
        $this->student_id = $stu_id;
        $this->username = $uname;
        $this->pass = $pass;
        $this->email = $email;
        
        $this->db = DatabaseHandler::getInstance();
    }
    
    public function login($role){
        $m_param = [];
        $m_param['uname'] = $this->username;
        $m_param['stu_id'] = $this->student_id;
        
        $a_param = [];
        $a_param['uname'] = $this->username;
        
        $hashed_pwd = "";
        $result = 0;
        $data = null;
        $id = null;
        $username = null;
        
        if($role == "member"){
            $data = $this->db->select("SELECT id,username,pw FROM member WHERE username = :uname OR stu_id = :stu_id",$m_param);
        }
        else if($role == "admin"){
            $data = $this->db->select("SELECT id,username,pw FROM admin WHERE username = :uname",$a_param);
        }
        
        if(count($data) == 1 ){
            foreach ($data as $rows){
                $hashed_pwd = $rows['pw'];
                $id = $rows['id'];
                $username = $rows['username'];
            }
            if(password_verify($this->pass,$hashed_pwd)){
            $result = 1;
            session_start();
            $_SESSION['id'] = $id;   
            $_SESSION['role'] = $role;
            $_SESSION['username'] = $username;
            }
        }        
        
        return $result;
    }
    
    public function logout(){
        session_start();
        unset($_SESSION['id']);
        session_destroy();
    }
    
    public function register(){
        $m_param = [];
        $m_param[':stu_id'] = $this->student_id;    
        $m_param[':uname'] = $this->username;
        $m_param[':pass'] = password_hash($this->pass,PASSWORD_DEFAULT);
        $m_param[':email'] = $this->email;
        
        $result = $this->db->insert("INSERT INTO member (stu_id,username,pw,email) values(:stu_id,:uname,:pass,:email)",$m_param);
        return $result;
    }
    
    public function checkRegistered(){
        $m_param = [];
        $m_param[':stu_id'] = $this->student_id;    
        $m_param[':uname'] = $this->username;
        $data = $this->db->select("SELECT id FROM member WHERE username = :uname OR stu_id = :stu_id",$m_param);
        return count($data);
    }    
    
    public function checkMember(){
        $m_param = [];
        $m_param[':stu_id'] = $this->student_id;    
        $m_param[':uname'] = $this->username;
        $data = $this->db->select("SELECT approved,block FROM member WHERE username = :uname OR stu_id = :stu_id",$m_param);
        if(count($data) == 1 ){
            foreach ($data as $rows){
                $block = $rows['block'];
                $approved = $rows['approved'];
            }
            if($block == 1 or $approved == 0)
                return 0;
            else if($block == 0 and $approved == 1)
                return 1;
        }         
    }
    
    public function checkEmail($email){
        $params = [];
        $params[":email"] = $email;
        
        $data = $this->db->count("SELECT id FROM member WHERE email = :email" ,$params);
        return $data;
    }
    
    public function forgetPassword($email){
        //random password
        $new_pwd = bin2hex(openssl_random_pseudo_bytes(4));
        if($this->checkEmail($email) == 1){
            $params = [];
            $params[":email"] = $email;            
            $get = $this->db->selectOne("SELECT id,email FROM member WHERE email = :email" ,$params);
            $id = $get["id"];
            $email = $get["email"];
            
            $msg = "Here is your new password: ". $new_pwd;
            
            $new_pwd = password_hash($new_pwd,PASSWORD_DEFAULT);
            
            $params = [];
            $params[":pw"] = $new_pwd; 
            $params[":id"] = $id;
            $data = $this->db->update("UPDATE member SET pw = :pw WHERE id = :id", $params);
            
            mail($email,"New Password From Ohcoolsy",$msg);
            return 1;
        }
        else
        return 0;
        
    }
    
}



?>