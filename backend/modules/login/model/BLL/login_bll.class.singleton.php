<?php
   require MODEL_DAO_LOGIN."login_dao.class.singleton.php";
   require UTILS_PATH."middleware.inc.php";
class login_bll{
    private $dao;
    private $db;
    static $_instance;

    private function __construct()
    {
        $this->dao = login_dao::getInstance();
        $this->db = db::getInstance();
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function show_View(){
        return $this->dao->select_View($this->db);
    }
    public function register($arryArguments){
        try{
        $check = $this->dao->validate_user($this->db,$arryArguments);
        }catch(Exception $e){

        }
        if($check){
            $validar = 1;
            echo json_encode($validar);
            exit;
        }else{
            try{
                $insert = $this->dao->insert_user($this->db,$arryArguments);
                // $user = $this->dao->select_user($this->db,$arryArguments);
            }catch(Exception $e){

            }
            if(!$insert){
                echo json_encode("Error al registrar el usuario");
                exit;
            }else{
                try{
                    $user = $this->dao->select_user($this->db,$arryArguments);
                }catch(Exception $e){
    
                }
                if($user){
                    foreach($user as $index => $value){
                        $email = $value['correo'];
                    }
        
                    echo json_encode($email);
                    exit;
                }
            }
        }
        // return $this->dao->insert_user($this->db,$arryArguments);
    }
    public function login($arryArguments){
        try{
            $val = $this->dao->validate_user($this->db,$arryArguments);
        }catch(Exception $e){

        }

        if($val){
            try{
                $valid = $this->dao->validate_verifyUser($this->db,$arryArguments);
                return $valid;
            }catch(Exception $e){
                Content::loadError();
            }
            foreach($valid as $index => $value){
                $veri = $value['verify'];
            }
            if($veri==1){
                try{
                    $rdo = $this->dao->select_user($this->db,$arryArguments);
                }catch(Exception $e){
    
                }
                if(!$rdo){
                    echo json_encode('No hay usuarios');
                    exit();
                }else{
                    foreach($rdo as $index => $value){
                        $contra = $value['contrasenya'];
                        $nom = $value['nombre'];
                    }
                    if(password_verify($arryArguments[1],$contra)){
                        $usuario=$nom;
                        $token = encodeT($usuario);
                        echo json_encode($token);
                        exit;
                    }else{
                        echo json_encode('Los datos no coinciden');
                    }
                }
            }else{
                echo json_encode('Se debe validar el usuario');
            }

        }else{
            $validar=1;
            echo json_encode($validar);
            exit();
        }
        // return $this->dao->select_user($this->db,$arryArguments);
    }
    public function menu($arryArguments){
        try{
            $token = $arryArguments;
            $deToken = decodeT($token); 
            $usuari = substr($deToken,41);
            $valName = $this->dao->select_user_name($this->db,$usuari);
        }catch(Exception $e){

        }
        if(!$valName){
            echo json_encode('Error al encotrar la información del usuario');
            exit();
        }else{
            $arry=array();

            foreach ($valName as $value) {
                array_push($arry, $value);
            }

            echo json_encode($arry);
            exit;
        }
    }
    public function tokenVerify($mailClient){
        $secureToken = Content::generate_Token(20);
        $arryArguments = array();
        array_push($arryArguments,$mailClient);
        array_push($arryArguments,$secureToken);
        // return $arryArguments;
        $ins = $this->dao->insert_tokenVerify($this->db,$arryArguments);
        if($ins){
            return $secureToken;
        }
    }
    public function tokenVerifyRecover($email){
        $secureToken = Content::generate_Token(20);
        $arryArguments = array();
        array_push($arryArguments,$email);
        array_push($arryArguments,$secureToken);
        try{
            $validate = $this->dao->validate_recover($this->db,$arryArguments);
        }catch(Exception $e){
            Content::loadError();
        }
        if($validate){
            try{
                $ins = $this->dao->update_tokenVerifyRecover($this->db,$arryArguments);
            }catch (Exception $e){
                Content::loadError();
            }
            if($ins){
                return $secureToken;
            }
        }else{
            echo json_encode('Error al insertar el toquen');
        }

    }
    public function verifyUser($arryArguments){
        try{
            $valid = $this->dao->validate_verify($this->db,$arryArguments);
        }catch(Exception $e){
            Content::loadError();
        }
        foreach($valid as $index => $value){
            $veri = $value['verify'];
        }
        if($veri==0){
            $updt = $this->dao->update_verify($this->db,$arryArguments);
            
            if($updt==true){
                echo json_encode('Usuario validado correctamente');
                exit;
            }else{
                echo json_encode('Error al validar el usuario');
                exit;
            }

        }else{
            echo json_encode('Usuario ya verificado');
            exit;
        }
    }
    public function recoverPass($arryArguments){
        try{
            $valid = $this->dao->validate_user($this->db,$arryArguments);
        }catch(Exception $e){
            Content::loadError();
        }
        if($valid){
            try{
                $updt = $this->dao->update_passwd($this->db,$arryArguments);
            }catch(Exception $e){
                Content::loadError();
            }
            if($updt==true){
                $check = 1;
                return $check;
            }else{
                echo json_encode('Error al actualizar la contraseña');
                exit;
            }
        }else{
            echo json_encode('Error al realizar la verificacion');
            exit;
        }
    }
    public function socialGit($arryArguments){
        $name = $arryArguments[1];
        try{
            $valid = $this->dao->validate_user_social($this->db,$arryArguments);
        }catch(Exception $e){

        }
        if($valid){
            try{
            $validToken = $this->dao->validate_token_git($this->db,$arryArguments);
            }catch(Exception $e){

            }
            if($validToken){
                try{
                    $userValid = $this->dao->validate_user($this->db,$arryArguments);
                }catch(Exception $e){
    
                }
                if ($userValid){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }else{
                   $ins =  $this->dao->insert_social_user($this->db,$arryArguments);
                }
                if($ins){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }
            }else{
                try{
                    $update = $this->dao->update_gitToken($this->db,$arryArguments);
                }catch(Exception $e){

                }
                if($update){
                    try{
                        $userValid = $this->dao->validate_user($this->db,$arryArguments);
                    }catch(Exception $e){
        
                    }
                    if ($userValid){
                        $token = encodeT($name);
                        echo json_encode($token);
                        exit;
                    }else{
                       $ins =  $this->dao->insert_social_user($this->db,$arryArguments);
                    }
                    if($ins){
                        $token = encodeT($name);
                        echo json_encode($token);
                        exit;
                    }
                }else{
                    echo json_encode('Error al insertar el gitToken');
                    exit;
                }

            }
        }else{
            try{
                $insert =  $this->dao->insert_social_GitTokens($this->db,$arryArguments);
            }catch(Exception $e){

            }
            if ($insert){
                try{
                    $userValid = $this->dao->validate_user($this->db,$arryArguments);
                }catch(Exception $e){
    
                }
                if ($userValid){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }else{
                   $ins =  $this->dao->insert_social_user($this->db,$arryArguments);
                }
                if($ins){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }
            }else{
                echo json_encode('Error al insertar el Git TOken');
                exit;
            }
        }
    }
    public function socialGoogle($arryArguments){
        $name = $arryArguments[1];
        try{
            $valid = $this->dao->validate_user_social($this->db,$arryArguments);
        }catch(Exception $e){

        }
        if($valid){
            try{
            $validToken = $this->dao->validate_token_google($this->db,$arryArguments);
            }catch(Exception $e){

            }
            if($validToken){
                try{
                    $userValid = $this->dao->validate_user($this->db,$arryArguments);
                }catch(Exception $e){
    
                }
                if ($userValid){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }else{
                   $ins =  $this->dao->insert_social_user($this->db,$arryArguments);
                }
                if($ins){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }
            }else{
                try{
                    $update = $this->dao->update_googleToken($this->db,$arryArguments);
                }catch(Exception $e){

                }
                if($update){
                    try{
                        $userValid = $this->dao->validate_user($this->db,$arryArguments);
                    }catch(Exception $e){
        
                    }
                    if ($userValid){
                        $token = encodeT($name);
                        echo json_encode($token);
                        exit;
                    }else{
                       $ins =  $this->dao->insert_social_user($this->db,$arryArguments);
                    }
                    if($ins){
                        $token = encodeT($name);
                        echo json_encode($token);
                        exit;
                    }
                }else{
                    echo json_encode('Error al insertar el gitToken');
                    exit;
                }

            }
        }else{
            try{
                $insert =  $this->dao->insert_social_GoogleTokens($this->db,$arryArguments);
            }catch(Exception $e){

            }
            if ($insert){
                try{
                    $userValid = $this->dao->validate_user($this->db,$arryArguments);
                }catch(Exception $e){
    
                }
                if ($userValid){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }else{
                   $ins =  $this->dao->insert_social_user($this->db,$arryArguments);
                }
                if($ins){
                    $token = encodeT($name);
                    echo json_encode($token);
                    exit;
                }
            }else{
                echo json_encode('Error al insertar el Google TOken');
                exit;
            }
        }
    }
}