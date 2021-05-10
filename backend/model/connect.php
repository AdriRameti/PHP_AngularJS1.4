<?php
class connect{
    public static function con(){
        $host = '127.0.0.1';  
        $user = "root";                     
        $pass = "adrian311299";                             
        $db = "crudclothes";                      
        $port = 3306;            
                               
        $conexion = mysqli_connect($host, $user, $pass, $db, $port);
        return $conexion;
    }
    public static function close($conexion){
        mysqli_close($conexion);
    }
}