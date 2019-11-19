<?php

class DatabaseHandler {
    private $host = "";
    private $user = "";
    private $pass = "";
    private $dbName = "";
    
    private $db_con = null;
    
    private static $instance = null;
    
    private final function __construct($host = NULL,$user = NULL,$pass = NULL,$dbName = NULL) {
        $this->host = $host ?? "mysql.hostinger.com"; 
        $this->dbName = $dbName ?? "u688446224_CSE3033";        
        $this->user = $user ?? "u688446224_CSE";
        $this->pass = $pass ?? "12345";
        
        try{
            $this->db_con = new PDO("mysql:host=".$this->host.";dbname=".$this->dbName,$this->user,$this->pass);
            $this->db_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
        
    }
  
    private final function __clone() {
        throw new Exception("Can't clone a singleton");
    }      
    
    public function select($query,$param=NULL){
        $stmt = $this->db_con->prepare($query);
        $stmt->execute($param);
        $result = $stmt->fetchAll();
        return $result;
    }
    
    public function selectOne($query,$param=NULL){
        $stmt = $this->db_con->prepare($query);
        $stmt->execute($param);
        $result = $stmt->fetch();
        return $result;
    }    
 
    public function insert($query,$param){
        $stmt = $this->db_con->prepare($query);
        if ($stmt->execute($param))
        return true;
        else
        return false;
    }  
 
    public function update($query,$param){
        $stmt = $this->db_con->prepare($query);
        if ($stmt->execute($param))
        return true;
        else
        return false;
        
    }   
    
    public function delete($query,$param){
        $stmt = $this->db_con->prepare($query);
        if ($stmt->execute($param))
        return true;
        else
        return false;
    }     
    
    public function count($query,$param=NULL){
        $stmt = $this->db_con->prepare($query);
        $stmt->execute($param);
        $result = $stmt->rowCount();
        return $result;
    }   
    
    public function lastID(){
        return $this->db_con->lastInsertId();
    }
    
    public function close_connections(){
        $db_con = null;
    }
    
    public final static function getInstance($host = NULL,$user = NULL,$pass = NULL,$dbName = NULL)
    {
        if (self::$instance == null)
        {
          self::$instance = new DatabaseHandler($host,$user,$pass,$dbName);
        }
     
        return self::$instance;
    }
     

}
    
?>