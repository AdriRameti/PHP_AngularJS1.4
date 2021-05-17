<?php
    require MODEL_BLL_SHOP."shop_bll.class.singleton.php";
class shop_model {

    private $bll;
    static $_instance;

    private function __construct(){
        $this->bll = shop_bll::getInstance();
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function listar(){
        return $this->bll->listar();
    }
    public function show($arryArguments){
        return $this->bll->show($arryArguments);
    }
    public function countProds($arryArguments){
        return $this->bll->countProds($arryArguments);
    }
    public function details($arryArguments){
        return $this->bll->details($arryArguments);
    }
    public function filters($arryArguments){
        return $this->bll->filters($arryArguments);
    }
    public function filters2($arryArguments){
        return $this->bll->filters2($arryArguments);
    }
    public function search($arryArguments){
        return $this->bll->search($arryArguments);
    }
    public function showLikes($arryArguments){
        return $this->bll->showLikes($arryArguments);
    }
    public function favorites($arryArguments){
        return $this->bll->favorites($arryArguments);
    }
}