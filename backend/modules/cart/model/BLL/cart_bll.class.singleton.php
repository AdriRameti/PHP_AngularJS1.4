<?php
   require MODEL_DAO_CART."cart_dao.class.singleton.php";
class cart_bll{
    private $dao;
    private $db;
    static $_instance;

    private function __construct()
    {
        $this->dao = cart_dao::getInstance();
        $this->db = db::getInstance();
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function showCart($arryArguments){
        return $this->dao->select_showCart($this->db,$arryArguments);
    }
    public function deleteCart($arryArguments){
        return $this->dao->delete_Cart($this->db,$arryArguments);
    }
    public function update_cantity($arryArguments){
        $rdo = $this->dao->update_cantity($this->db,$arryArguments);
        if($rdo==true){
            $can = $this->dao->validate_cantity($this->db,$arryArguments);
        }
        return $can;
    }
    public function less_cantity($arryArguments){
        try{
             $rdo = $this->dao->validate_cantity($this->db,$arryArguments);
        }catch(Exception $e){
            echo json_encode('Error validar');
            exit;
        }
        foreach($rdo as $index => $value){
            $less = $value['cantidad'];
        }
        // echo json_encode($less);
        // exit;
        if($less==0 || $less==null || $less <0)  {
            $check = 0;
            return $check;
        }else{
        try{
             $rdo = $this->dao->less_cantity($this->db,$arryArguments);
        }catch(Exception $e){
            return ('Error disminuir cantidad');
            exit;
        }
        if(!$rdo){
            return ('Error al realizar la actualizacion');
            exit;
        }else{
            $cnt = $this->dao->validate_cantity($this->db,$arryArguments);
            return $cnt;
            exit;
        }  
        }
        // return $this->dao->less_cantity($this->db,$arryArguments);
    }
    public function delete_item($arryArguments){
        return $this->dao->delete_item($this->db,$arryArguments);
    }
    public function insert_item($arryArguments){
        try{
        $valid = $this->dao->validate_items($this->db,$arryArguments);
        }catch(Exception $e){
            
        }
        // echo json_encode($arryArguments);
        // exit;
        if (!$valid || mysqli_num_rows($valid)==0 ){
            try{
                $insert = $this->dao->insert_item($this->db,$arryArguments);
            }catch(Exception $e){
                    
            }

            if(!$insert){
                return ('Error al introducir');
                exit;
            }else{
                return ('Item introducido correctamente');
                exit;
            }
        }
        // return $this->dao->insert_item($this->db,$arryArguments);
    }
}