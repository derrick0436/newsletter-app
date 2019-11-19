<?php
require('DatabaseHandler.php');
class Post{
    
    public function __construct(){
        $this->db = DatabaseHandler::getInstance();
    }
    
    public function viewShare(){
        $data = $this->db->select("SELECT content,
        (SELECT M.username FROM member M WHERE N.fromUser = M.id) as username FROM notificationShare N
        WHERE (SELECT approved FROM post P WHERE P.id = N.post_id) = 1 
        AND (SELECT archive FROM post P WHERE P.id = N.post_id) = 0");
        return $data;
    }
    
    public function viewApprovedUserPost($id){
        $param = [];
        $param[':id'] = $id;        
        $data = $this->db->select("SELECT id,title,category as categoryId,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,content,date FROM post P WHERE approved = 1 AND mid = :id",$param);    
        return $data;
    }
    
    public function viewDisapprovedUserPost($id){
        $param = [];
        $param[':id'] = $id;
        
        $data = $this->db->select("SELECT id,title,category as categoryId,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,content,date FROM post P WHERE approved = 0 AND mid = :id",$param);    
        return $data;
    }    
    
    public function viewApprovedPost(){
        $data = $this->db->select("SELECT id,title,category as categoryId,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,content,date FROM post P WHERE approved = 1 AND archive = 0");
        return $data;
    }
    
    public function viewApprovedPostThisWeek(){
        $data = $this->db->select("SELECT id,title,category as categoryId,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,(SELECT email FROM member M WHERE M.id = P.mid) as email,(SELECT stu_id FROM member M WHERE M.id = P.mid) as stuid,content,date FROM post P WHERE approved = 1 AND archive = 0 AND YEARWEEK(date)=YEARWEEK(NOW())");
        return $data;
    }    
    
    public function viewDisapprovedPost(){
        $data = $this->db->select("SELECT id,title,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,content,date FROM post P WHERE approved = 0 AND archive = 0");
        return $data;
    }    
    
    public function viewArchivePost(){
        $data = $this->db->select("SELECT id,title,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,content,date FROM post P WHERE archive = 1");
        return $data;
    }        

    public function archivePost($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->update("UPDATE post SET archive = 1 WHERE id = :id;",$param);
        return $data;
    }  
    
    public function unarchivePost($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->update("UPDATE post SET archive = 0 WHERE id = :id;",$param);
        return $data;
    }       
    
    public function approvePost($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->update("UPDATE post SET approved = 1 WHERE id = :id;",$param);
        return $data;     
    }
    
    public function disapprovePost($id){
        $param = [];
        $param[':id'] = $id;

        $data = $this->db->delete("DELETE FROM post WHERE id = :id",$param);
        return $data;     
    }    
    
    public function deletePost($id){
        $param = [];
        $param[':post_id'] = $id;
        $data = $this->db->delete("DELETE FROM postlike WHERE post_id = :post_id",$param);          
        $data = $this->db->delete("DELETE FROM notificationShare WHERE post_id = :post_id",$param);          
        $data = $this->db->delete("DELETE FROM postcomment WHERE post_id = :post_id",$param);        
        $param = [];
        $param[':id'] = $id;
        $data = $this->db->delete("DELETE FROM post WHERE id = :id",$param);
        return $data;     
    }        
    
    public function viewPostPic($id){
        $params = [];
        $params[":id"] = $id;
        $data = $this->db->select("SELECT pic FROM post WHERE id = :id",$params);
        $pic = "";
        foreach($data as $rows){
            $pic = base64_encode( $rows['pic'] );
        }
        return $pic;
    }    

    public function getAllCategory(){
         
        $data = $this->db->select("SELECT id,name FROM category");
    
        return $data;     
    }
    
    public function getLikeCount($id){
        $params = [];
        $params[":id"] = $id;        
        $data = $this->db->count("SELECT user_id FROM postlike WHERE post_id = :id",$params);  
        return $data;
    }
    
    public function likePost($id){
        if (session_status() == PHP_SESSION_NONE)
            session_start();        
        
        if($this->checkLiked($id) == 1){
            $param = [];
            $param[':id'] = $id;        
            $param[':user_id'] = $_SESSION["id"];            
            $data = $this->db->delete("DELETE FROM postlike WHERE post_id = :id AND user_id = :user_id",$param);     
        }
        else{
            $param = [];
            $param[':id'] = $id;   
            $param[':user_id'] = $_SESSION["id"];
            $data = $this->db->insert("INSERT INTO postlike(user_id,post_id) VALUES(:user_id,:id)",$param);  
        }
        return $data;
    }
    
    public function checkLiked($id){
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }        
        $params = [];
        $params[":id"] = $id;  
        $params[":user_id"] = $_SESSION["id"];
        $data = $this->db->count("SELECT user_id FROM postlike WHERE post_id = :id AND user_id = :user_id",$params);  
        return $data;
    }    
    
    public function addPostComment($id,$text){
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }            
        $params[":user_id"] = $_SESSION["id"]; 
        $params[":post_id"] = $id;
        $params[":comment"] = $text;
        $params[":date"] = date("Y/m/d");
        $data = $this->db->insert("INSERT INTO postcomment(user_id,post_id,comment,date) VALUES(:user_id,:post_id,:comment,:date)",$params);  
        return $data;
    }
    
    public function getPostComment($id){
        $params = [];
        $params[":id"] = $id;
        $data = $this->db->select("SELECT (SELECT username FROM member M WHERE M.id = PC.user_id) as username,comment,date FROM postcomment PC WHERE post_id = :id",$params);
        return $data;     
    }        
    
    public function sharePost($title,$category,$content,$pic){
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $params = [];
        $params[":mid"] = $_SESSION["id"];
        $params[":title"] = $title;
        $params[":category"] = $category;
        $params[":content"] = $content;
        $params[":pic"] = $pic;
        $params[":date"] = date("Y/m/d");
        $params[":approved"] = 0;
        $params[":archive"] = 0;        
        $data = $this->db->insert("INSERT INTO post(mid,title,category,content,pic,date,approved,archive) VALUES(:mid,:title,:category,:content,:pic,:date,:approved,:archive)",$params);
        
        $lastid = $this->db->lastID();
        
        $params = [];
        $params[":fromUser"] = $_SESSION["id"];
        $params[":content"] = $content;        
        $params[":post_id"] = $lastid;
        $data = $this->db->insert("INSERT INTO notificationShare(content,fromUser,post_id) VALUES(:content,:fromUser,:post_id)",$params);        
        
        return $data;        
    }           
    
    public function addPost($title,$category,$content,$pic){
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $params[":mid"] = $_SESSION["id"];
        $params[":title"] = $title;
        $params[":category"] = $category;
        $params[":content"] = $content;
        $params[":pic"] = $pic;
        $params[":date"] = date("Y/m/d");
        $params[":approved"] = 0;
        $params[":archive"] = 0;        
        $data = $this->db->insert("INSERT INTO post(mid,title,category,content,pic,date,approved,archive) VALUES(:mid,:title,:category,:content,:pic,:date,:approved,:archive)",$params);
        return $data;        
    }        
    
    public function editPost($id,$title,$category,$content,$pic){
        $params[":id"] = $id;
        $params[":title"] = $title;
        $params[":category"] = $category;
        $params[":content"] = $content;
        $params[":pic"] = $pic;
        $data = $this->db->update("UPDATE post SET title = :title, category = :category, content = :content, pic = :pic WHERE id = :id",$params);
        return $data;        
    }    
    
    public function searchByMonth($month){
        $params = [];
        $params[":month"] = $month;
        $data = $this->db->select("SELECT id,title,category as categoryId,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,content,date FROM post P WHERE approved = 1 AND archive = 0 AND MONTH(date) = :month AND YEARWEEK(date)=YEARWEEK(NOW())",$params);
        return $data;        
    }

    public function searchByCategory($category){
        $params = [];
        $params[":category"] = $category;
        $data = $this->db->select("SELECT id,title,category as categoryId,(SELECT name FROM category C WHERE C.id = P.category) as category,(SELECT username FROM member M WHERE M.id = P.mid) as mname ,content,date FROM post P WHERE approved = 1 AND archive = 0 AND category=:category AND YEARWEEK(date)=YEARWEEK(NOW())",$params);
        return $data;        
    }    
}

?>