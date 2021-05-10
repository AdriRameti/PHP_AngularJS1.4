<?php
class redirection{
    private static $controllerName;
    static $_instance;
    public function __construct()
    {
       
    }
    public static function getInstance(){
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }
    public function initApp(){
        // $url = $this-> getUrl();
        // $met = $this-> getOption();

        call_user_func(array($this->loadPage(),$this->loadFunc()));
        // try{
        //     $action = router::getAction($url); //Obtenemos la accion del router a partir de la pagina que hemos obtenido ($url);

        //     $controllerName = $action["controller"];
        //     // $method= $action["method"];

        //    $option = router::getFunction($url,$met);

        //    $method = $option["metodo"];
        //     require MODULES_PATH.$url."/controller/".$controllerName.".class.php";

        //     $controller = new $controllerName(); //Instanciamos el controlador

        //     $controller->$method(); //Llamamos al metodo del controlador
        // }catch(Exception $e){
        //     Content::loadError();
            
        // }
    }
    public function loadPage(){
        $url = $this-> getUrl();
        $action = router::getAction($url);
        $controllerName = $action["controller"];
        require MODULES_PATH.$url."/controller/".$controllerName.".class.php";
        return new $controllerName;
    }
    public function loadFunc(){
        $url = $this-> getUrl();
        $met = $this-> getOption();
        require MODULES_PATH.$url."/recursos/".$url."_routes.php";
        $option = router::getFunction($url,$met);
        $method = $option["metodo"];
        return $method;
    }
    public function getUrl(){
        if (isset($_GET["page"])){
            return $_GET["page"];
        }else{
            $_GET["page"] = "home";
            return $_GET["page"];
        }
    }
    public function getOption(){
        if (isset($_GET["op"])){
            return $_GET["op"];
        }else {
            $_GET["op"] = "list";
            return $_GET["op"];
        }
    }
}