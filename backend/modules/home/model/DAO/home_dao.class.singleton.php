<?php
class home_dao{
    static $_instance;
    private function __construct() {
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_categories($db){
        $sql = "SELECT * FROM categories";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_Slider($db,$arryArguments){
        $sql = "SELECT img FROM categories;";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_searchHome($db,$arryArguments){
        $valor2 = $arryArguments;
        $sql = "SELECT * FROM categories WHERE nombre LIKE '%$valor2%'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }

}