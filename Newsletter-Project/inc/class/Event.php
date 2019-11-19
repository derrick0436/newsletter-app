<?php
require('DatabaseHandler.php');
class Event{
    
    public function __construct(){
        $this->db = DatabaseHandler::getInstance();
    }
    
    public function findStuID($stuid){
        $params = [];
        $params[":stuid"] = $stuid;
        $data = $this->db->selectOne("SELECT id FROM member WHERE stu_id = :stuid",$params);     
        return $data["id"];
    }
    
    public function invite($stuid,$event){
        if (session_status() == PHP_SESSION_NONE)        
        session_start();        
        
        $id = $this->findStuID($stuid);
        $params = [];
        $params[":user_id"] = $id;
        $params[":event_id"] = $event;
        $count = $this->db->count("SELECT user_id FROM joinevent WHERE user_id = :user_id AND event_id = :event_id",$params);
        
        if(!empty($id)){
        if($count == 0 && $_SESSION["id"] != $id){
            $params = [];
            $params[":fromUser"] = $_SESSION["id"];
            $params[":toUser"] = $id;
            $params[":event_id"] = $event;
            $count = $this->db->count("SELECT id FROM notificationInvite WHERE fromUser = :fromUser AND toUser = :toUser AND event_id = :event_id",$params);
            if($count == 0){
                $params = [];
                $params[":fromUser"] = $_SESSION["id"];
                $params[":toUser"] = $id;
                $params[":event_id"] = $event;
                $params[":date"] = date("Y/m/d");
                $data = $this->db->insert("INSERT INTO notificationInvite(event_id,fromUser,toUser,date) VALUES(:event_id,:fromUser,:toUser,:date)",$params);
                return $data;                
            }
            else
            return 0;

        }
        else
        return 0;
        }
        else
        return 0;

    }        
    
    public function viewInvitation(){
        if (session_status() == PHP_SESSION_NONE)        
        session_start();
        
        $params = [];
        $params[":id"] = $_SESSION["id"];        
        
        $data = $this->db->select("SELECT 
        (SELECT E.title FROM event E WHERE N.event_id = E.id) AS title,
        (SELECT E.date FROM event E WHERE N.event_id = E.id) AS event_date,
        (SELECT E.time FROM event E WHERE N.event_id = E.id) AS event_time,
        (SELECT E.venue FROM event E WHERE N.event_id = E.id) AS event_venue,
        (SELECT M.username FROM member M WHERE M.id = N.fromUser) AS fromUser,
        toUser,
        fromUser as userId,
        event_id,
        date
        FROM notificationInvite N
        WHERE (SELECT E.date FROM event E WHERE N.event_id = E.id) >= CURDATE() 
        AND toUser = :id;",$params);
        return $data;        
    }
    
    public function declineInvitation($from,$to,$event){
        $params = [];
        $params[":from"] = $from;
        $params[":to"] = $to;
        $params[":event"] = $event;
        $data = $this->db->delete("DELETE FROM notificationInvite WHERE fromUser = :from AND toUser = :to AND event_id = :event",$params);
        return $data;
    }    
    
    public function approveInvitation($from,$to,$event){
        $params = [];
        $params[":from"] = $from;
        $params[":to"] = $to;
        $params[":event"] = $event;
        $data = $this->db->delete("DELETE FROM notificationInvite WHERE fromUser = :from AND toUser = :to AND event_id = :event",$params);
        
        $params = [];
        $params[":id"] = $event;
        $params[":user_id"] = $_SESSION["id"];    
        
        $data = $this->db->insert("INSERT INTO joinevent(event_id,user_id) VALUES(:id,:user_id)",$params);   
        
        return $data;
    }        
    
    public function viewEvent(){
        $data = $this->db->select("SELECT id,title,(SELECT name FROM category C WHERE C.id = E.category) as category ,category as category_id,content,time,venue,date FROM event E");
        return $data;
    }
    
    public function viewEventAFTDATE(){
        $data = $this->db->select("SELECT id,title,(SELECT name FROM category C WHERE C.id = E.category) as category ,content,time,venue,date FROM event E WHERE date >= CURDATE()");
        return $data;
    }    
    
    public function viewEventPic($id){
        $params = [];
        $params[":event"] = $id;
        $data = $this->db->select("SELECT pic FROM eventpic WHERE event = :event",$params);
        $pic = [];
        foreach($data as $rows){
            $pic[] = base64_encode( $rows['pic'] );
        }
        return $pic;
    }
    
    public function viewEventOnePic($id){
        $params = [];
        $params[":event"] = $id;
        $data = $this->db->select("SELECT pic FROM eventpic WHERE event = :event LIMIT 1",$params);
        $pic = "";
        foreach($data as $rows){
            $pic = base64_encode( $rows['pic'] );
        }
        return $pic;        
    }

    public function deleteEvent($id){
        $params = [];
        $params[":event"] = $id;
        $data = $this->db->delete("DELETE FROM joinevent WHERE event_id = :event",$params);         
        $params = [];
        $params[":event"] = $id;
        $data = $this->db->delete("DELETE FROM notificationInvite WHERE event_id = :event",$params);        
        $params = [];
        $params[":event"] = $id;
        $data = $this->db->delete("DELETE FROM eventpic WHERE event = :event",$params);
        $params = [];
        $params[":id"] = $id;        
        $data = $this->db->delete("DELETE FROM event WHERE id = :id",$params);
        return $data;
    }
    
    public function clearPic($id){
        $params = [];
        $params[":id"] = $id;
        $this->db->delete("DELETE FROM eventpic WHERE event = :id",$params);        
    }
    
    public function uploadPic($id,$pic){
        $params[":id"] = $id;
        $params[":pic"] = $pic;
        $data = $this->db->insert("INSERT INTO eventpic(event,pic) VALUES(:id,:pic)",$params);
        return $data;        
    }
    
    public function viewJoinedEvent(){
        if (session_status() == PHP_SESSION_NONE)        
        session_start();
        
        $params = [];
        $params[":id"] = $_SESSION["id"];
        $data = $this->db->select("SELECT E.id,E.title,(SELECT name FROM category C WHERE C.id = E.category) as category ,E.content,E.date,E.venue,E.time FROM joinevent JE INNER JOIN event E ON JE.event_id = E.id
            where JE.user_id = :id AND date >= CURDATE()",$params);
        return $data;        
    }    
    
    public function checkJoinedEvent($id){
        if (session_status() == PHP_SESSION_NONE)        
        session_start();
        
        $params = [];
        $params[":id"] = $id;
        $params[":user_id"] = $_SESSION["id"];
        $data = $this->db->count("SELECT event_id FROM joinevent
            WHERE user_id = :user_id AND event_id = :id",$params);
        return $data;            
    }
    
    public function joinEvent($id){
        if (session_status() == PHP_SESSION_NONE)        
        session_start();        
        
        if($this->checkJoinedEvent($id) == 1){
            $params = [];
            $params[":id"] = $id;
            $params[":user_id"] = $_SESSION["id"];    
            
            $data = $this->db->delete("DELETE FROM joinevent WHERE user_id = :user_id AND event_id = :id",$params);
        }
        else{
            $params = [];
            $params[":id"] = $id;
            $params[":user_id"] = $_SESSION["id"];    
            
            $data = $this->db->insert("INSERT INTO joinevent(event_id,user_id) VALUES(:id,:user_id)",$params);            
        }
        return $data;
    }
    
    public function searchByMonth($month){
        $params = [];
        $params[":month"] = $month;
        $data = $this->db->select("SELECT id,title,(SELECT name FROM category C WHERE C.id = E.category) as category ,content,date,time,venue FROM event E WHERE MONTH(date)=:month AND date >= CURDATE()",$params);
        return $data;        
    }

    public function searchByCategory($category){
        $params = [];
        $params[":category"] = $category;
        $data = $this->db->select("SELECT id,title,(SELECT name FROM category C WHERE C.id = E.category) as category ,content,date,time,venue FROM event E WHERE category=:category AND date >= CURDATE()",$params);
        return $data;        
    }
    
    public function editEvent($id,$title,$content,$category,$venue,$time,$date){
        $params = [];
        $params[":id"] = $id;
        $params[":title"] = $title;
        $params[":content"] = $content;
        $params[":category"] = $category;        
        $params[":venue"] = $venue;     
        $params[":time"] = $time;     
        $params[":date"] = $date; 
        $data = $this->db->update("UPDATE event SET title = :title, content = :content, category = :category, venue = :venue, time = :time, date = :date WHERE id = :id",$params);    
        return $data;
    }
    
    public function addEvent($title,$content,$category,$venue,$time,$date){
        $params = [];
        $params[":title"] = $title;
        $params[":content"] = $content;
        $params[":category"] = $category;        
        $params[":venue"] = $venue;     
        $params[":time"] = $time;        
        $params[":date"] = $date;
        $data = $this->db->insert("INSERT event(title,content,category,venue,time,date) VALUES(:title,:content,:category,:venue,:time,:date)",$params);    
        return $data;
    }    
    
    public function last_id(){
        return $this->db->lastID();
    }

}
?>