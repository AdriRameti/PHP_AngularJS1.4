<?php
class Content{
    private function __construct(){

    }
    public static function LoadView($namemodule,$view){
        require  MODULES_PATH.$namemodule."/vista/".$view.".html";
    }
    public static function loadError(){
        require INC_PATH."header.html";
        require INC_PATH."menu.html";
        require INC_PATH."404.html";
        require INC_PATH."footer.html";
    }
    public static function LoadModel($model_path,$model_name,$function,$arryArgument='',$arrArgument2 = ''){
        $model =$model_path.$model_name.'.class.singleton.php';
    if (file_exists($model)){
            include_once $model;
            $modelClass = $model_name;
        

        $object = $modelClass::getInstance();
         return call_user_func(array($object,$function),$arryArgument);

    }else {
            throw new Exception();
    }
    }
    public static function generate_Token($longitud){
        if ($longitud < 4) {
            $longitud = 4;
        }
        return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
    }
}