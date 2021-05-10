<?php
    require MODEL_BLL_CART."cart_bll.class.singleton.php";
class cart_model {

    private $bll;
    static $_instance;

    private function __construct(){
        $this->bll = cart_bll::getInstance();
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function showCart($arryArguments){
        return $this->bll->showCart($arryArguments);
    }
    public function deleteCart($arryArguments){
        return $this->bll->deleteCart($arryArguments);
    }
    public function update_cantity($arryArguments){
        return $this->bll->update_cantity($arryArguments);
    }
    public function less_cantity($arryArguments){
        return $this->bll->less_cantity($arryArguments);
    }
    public function delete_item($arryArguments){
        return $this->bll->delete_item($arryArguments);
    }
    public function insert_item($arryArguments){
        return $this->bll->insert_item($arryArguments);
    }
}