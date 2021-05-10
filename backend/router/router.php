<?php
class router {
    private static $routes = [];
    private static $func = [];
    private function __construct(){
        
    }
    public static function add($route,$controller){ //Añadir rutas
        static::$routes[$route] = ["controller" => $controller];
    }
    public static function getAction($route){ // Obtener las aciones hacia esas rutas. Basadas en una ruta obtenemos el controlador y metodo
        if (array_key_exists($route,static::$routes)){ //Comprobamos si existe la ruta en nuestra variable de rutas ($routes)
            return static::$routes[$route];
        }else{
            throw new Exception('La ruta '.$route.' no fue encontrada');
        }
    }
    public static function addFunction($method,$rote){
        static::$func[$method] = ["metodo"=>$method,"ruta" => $rote]; 
    }
    public static function getFunction($rote,$method){
        if (array_key_exists($method,static::$func)){
            return static::$func[$method];
        }else{
            throw new Exception('El metodo '.$method.' no fue encontrado');
        }
    }
}