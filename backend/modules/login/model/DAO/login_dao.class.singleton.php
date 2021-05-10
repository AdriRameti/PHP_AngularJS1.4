<?php
class login_dao{
    static $_instance;
    private function __construct() {
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function select_View($db){
        $sql = "SELECT * from usuario";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_user($db,$arryArguments){
        $email = $arryArguments[0];
        $nombre = $arryArguments[1];
        $passw = $arryArguments [2]; 
        $tipo='Cliente';
        $safe_passw = password_hash($passw,PASSWORD_DEFAULT);
        $hashavatar= md5( strtolower( trim( $email ) ) );
        $avatar ="https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";

        $sql = "INSERT INTO usuario (correo,contrasenya,avatar,tipo,nombre,verify) VALUES ('$email','$safe_passw','$avatar','$tipo','$nombre','0')";
        return $db->ejecutar($sql);
        // return $db->listar($stmt);
    }
    public function validate_user($db,$arryArguments){
        $email = $arryArguments[0];
        $sql = "SELECT * FROM usuario WHERE correo='$email'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_user($db,$arryArguments){
        $email = $arryArguments[0];
        $sql = "SELECT * FROM usuario WHERE correo='$email'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_user_name($db,$usuari){
        $sql ="SELECT nombre,avatar,tipo FROM usuario WHERE nombre LIKE '$usuari%' OR nombre='$usuari'";
        $stmt = $db->ejecutar($sql);
        return $db-> listar($stmt);
    }
    public function insert_tokenVerify($db,$arryArguments){
        $email = $arryArguments[0];
        $secureToken = $arryArguments[1];
        $sql = "INSERT INTO tokens (tokenVerify,email) VALUES ('$secureToken','$email')";
        return $db->ejecutar($sql);
        // return $db->listar($stmt);
    }
    public function validate_recover($db,$arryArguments){
        $email = $arryArguments[0];
        $sql = "SELECT * FROM tokens WHERE email='$email'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_tokenVerifyRecover($db,$arryArguments){
        $secureToken = $arryArguments[1];
        $sql = "UPDATE tokens set tokenRecover = '$secureToken'";
        return $db->ejecutar($sql);
        // return $db->listar($stmt);
    }
    public function validate_verify($db,$arryArguments){
        $email = $arryArguments[1];
        $sql = "SELECT u.verify from usuario u inner join tokens t on  u.correo = t.email where t.email = '$email'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function validate_verifyUser($db,$arryArguments){
        $email = $arryArguments[0];
        $sql = "SELECT u.verify from usuario u inner join tokens t on  u.correo = t.email where t.email = '$email'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_verify($db,$arryArguments){
        $email = $arryArguments[1];
        $sql = "UPDATE usuario set verify = '1' where correo = '$email'";
        return $db->ejecutar($sql);
    }
    public function update_passwd($db,$arryArguments){
        $email = $arryArguments[0];
        $passw = $arryArguments[1];
        $safe_passw = password_hash($passw,PASSWORD_DEFAULT);
        $sql = "UPDATE usuario set contrasenya = '$safe_passw' where correo = '$email'";
        return $db->ejecutar($sql);
    }
    public function validate_user_social($db,$arryArguments){
        $email = $arryArguments[0];
        $sql = "SELECT email FROM tokens WHERE email='$email'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function validate_token_git($db,$arryArguments){
        $token = $arryArguments[2];
        $sql = "SELECT * FROM tokens WHERE gitToken='$token'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function validate_token_google($db,$arryArguments){
        $token = $arryArguments[2];
        $sql = "SELECT * FROM tokens WHERE googleToken='$token'";
        $stmt =$db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_gitToken($db,$arryArguments){
        $email = $arryArguments[0];
        $token = $arryArguments[2];
        $sql = "UPDATE tokens set gitToken = '$token' where correo = '$email'";
        return $db->ejecutar($sql);
    }
    public function update_googleToken($db,$arryArguments){
        $email = $arryArguments[0];
        $token = $arryArguments[2];
        $sql = "UPDATE tokens set googleToken = '$token' where correo = '$email'";
        return $db->ejecutar($sql);
    }
    public function insert_social_user($db,$arryArguments){
        $email = $arryArguments[0];
        $nombre = $arryArguments[1];
        $passw = '1234'; 
        $tipo='Cliente';
        $safe_passw = password_hash($passw,PASSWORD_DEFAULT);
        $hashavatar= md5( strtolower( trim( $email ) ) );
        $avatar ="https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";

        $sql = "INSERT INTO usuario (correo,contrasenya,avatar,tipo,nombre,verify) VALUES ('$email','$safe_passw','$avatar','$tipo','$nombre','1')";
        return $db->ejecutar($sql);
        // return $db->listar($stmt);
    }
    public function insert_social_GitTokens($db,$arryArguments){
        $email = $arryArguments[0];
        $id = $arryArguments[2];
        $sql = "INSERT INTO tokens (email,gitToken) VALUES ('$email','$id')";
        return $db->ejecutar($sql);
    }
    public function insert_social_GoogleTokens($db,$arryArguments){
        $email = $arryArguments[0];
        $id = $arryArguments[2];
        $sql = "INSERT INTO tokens (email,googleToken) VALUES ('$email','$id')";
        return $db->ejecutar($sql);
    }
}