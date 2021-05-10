<?php
   require MODEL_DAO_HOME."home_dao.class.singleton.php";
class home_bll{
    private $dao;
    private $db;
    static $_instance;

    private function __construct()
    {
        $this->dao = home_dao::getInstance();
        $this->db = db::getInstance();
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function categories(){
        return $this->dao->select_categories($this->db);
    }
    public function Slider($arryArguments){
        return $this->dao->select_Slider($this->db,$arryArguments);
    }
    public function searchHome($arryArguments){
        return $this->dao->select_searchHome($this->db,$arryArguments);
    }
}