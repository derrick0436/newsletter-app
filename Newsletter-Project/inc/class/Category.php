<?php
require('DatabaseHandler.php');
class Category{
    
    public function __construct(){
        $this->db = DatabaseHandler::getInstance();
    }
    
    public function viewCategory(){
        $data = $this->db->select("SELECT id,name FROM category");
        return $data;
    }
    

}
?>