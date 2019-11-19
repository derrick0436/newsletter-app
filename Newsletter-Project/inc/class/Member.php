<?php
require('DatabaseHandler.php');
class Member{
    
    public function __construct(){
        $this->db = DatabaseHandler::getInstance();
    }
    
    public function getProfile(){
        if (session_status() == PHP_SESSION_NONE)
            session_start();
        
        $params = [];
        $params[":id"] = $_SESSION["id"]; 
        
        $data = $this->db->select("SELECT username,email FROM member WHERE id = :id",$params);
        return $data;
    }    
    
    public function viewProfilePic(){
        if (session_status() == PHP_SESSION_NONE)
            session_start();
        
        $params = [];
        $params[":id"] = $_SESSION["id"]; 
        $data = $this->db->select("SELECT pic FROM member WHERE id = :id",$params);
        $pic = "";
        foreach($data as $rows){
            $pic = base64_encode( $rows['pic'] );
        }
        return $pic;
    }        
    
    public function updateProfile($name,$email,$pic){
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $params[":id"] = $_SESSION["id"];
        $params[":name"] = $name;
        $params[":email"] = $email;
        $params[":pic"] = $pic;
        $_SESSION["username"] = $name;
        $data = $this->db->update("UPDATE member SET username = :name , email = :email , pic = :pic WHERE id = :id",$params);
        return $data;        
    }      
    
    public function updatePass($new,$old){
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        
        $params = [];
        $params[":id"] = $_SESSION["id"];
        $get_pwd = $this->db->selectOne("SELECT pw FROM member WHERE id = :id",$params);
        $password = $get_pwd["pw"];
        
        if(password_verify($old,$password)){
            $hash = password_hash($new,PASSWORD_DEFAULT);
            $params = [];
            $params[":id"] = $_SESSION["id"];  
            $params[":pw"] = $hash;
            $result = $this->db->update("UPDATE member SET pw = :pw WHERE id = :id",$params);
            return $result;
        }
        else{
            return 0;   
        }
    }       
    
    public function viewApprovedMember(){
        $data = $this->db->select("SELECT id,stu_id,username,email FROM member WHERE block = 0 AND approved = 1");
        return $data;
    }

    public function viewDisapprovedMember(){
        $data = $this->db->select("SELECT id,stu_id,username,email FROM member WHERE approved = 0 AND block = 0");
        return $data;
    }

    public function viewBlockedMember(){
        $data = $this->db->select("SELECT id,stu_id,username,email FROM member WHERE block = 1");
        return $data;
    }
    
    public function approveMember($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->update("UPDATE member SET approved = 1 WHERE id = :id;",$param);
        return $data;
    }    
    
    public function disapproveMember($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->delete("DELETE FROM member WHERE id = :id;",$param);
        return $data;
    }    
    
    public function blockMember($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->update("UPDATE member SET block = 1 WHERE id = :id;",$param);
        return $data;
    }
    
    public function unblockMember($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->update("UPDATE member SET block = 0 WHERE id = :id;",$param);
        return $data;
    }    
    
    public function deleteMember($id){
        $param = [];
        $param[':user_id'] = $id;
        $data = $this->db->delete("DELETE FROM joinevent WHERE user_id = :user_id;",$param);  
        $data = $this->db->delete("DELETE FROM notificationInvite WHERE toUser = :user_id OR fromUser = :user_id;",$param);      
        
        $pid = $this->db->select("SELECT id FROM post WHERE mid = :user_id",$param);
        if(count($pid) != 0){
            foreach($pid as $id){
            $param = [];
            $param[':post_id'] = $id["id"];       
            $data = $this->db->delete("DELETE FROM notificationShare WHERE post_id = :post_id;",$param);             
            $data = $this->db->delete("DELETE FROM postcomment WHERE post_id = :post_id;",$param);     
            $data = $this->db->delete("DELETE FROM postlike WHERE post_id = :post_id;",$param);             
            $data = $this->db->delete("DELETE FROM post WHERE id = :post_id;",$param);                    
            }
          
        }
        
        $param = [];
        $param[':user_id'] = $id;        
        $data = $this->db->delete("DELETE FROM postcomment WHERE user_id = :user_id;",$param);     
        $data = $this->db->delete("DELETE FROM postlike WHERE user_id = :user_id;",$param);             
        $data = $this->db->delete("DELETE FROM notificationShare WHERE fromUser = :user_id;",$param);            
        $param = [];
        $param[':id'] = $id;
        $data = $this->db->delete("DELETE FROM member WHERE id = :id;",$param);
        return $data;
    }      
}

?>