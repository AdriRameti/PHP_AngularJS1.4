<?php
    require MODEL_BLL_HOME."home_bll.class.singleton.php";
class home_model {

    private $bll;
    static $_instance;

    private function __construct(){
        $this->bll = home_bll::getInstance();
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function categories(){
        return $this->bll->categories();
    }
    public function Slider($arryArguments){
        return $this->bll->Slider($arryArguments);
    }
    public function searchHome($arryArguments){
        return $this->bll->searchHome($arryArguments);
    }
}