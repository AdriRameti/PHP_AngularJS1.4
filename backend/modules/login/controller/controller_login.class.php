<?php
class controller_login{
    // public function list(){
    //     require INC_PATH."header.php";
    //     require INC_PATH."menu.html";
    //     Content::LoadView("login","login");
    //     include (INC_PATH."footer.php");
    // }
    public function recoverView(){
        require INC_PATH."header.php";
        require INC_PATH."menu.html";
        Content::LoadView("login","recover");
        include (INC_PATH."footer.php");
    }
    public function show_View(){
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","show_View");
        echo json_encode($json);
    }
    public function register(){
        $email = $_POST['email'];
        $nombre =$_POST['nombre'];
        $contrase = $_POST['contrase'];
        $array =array(); 
        array_push($array , $email);
        array_push($array , $nombre);
        array_push($array ,$contrase);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","register",$array);
        echo json_encode($json);
    }
    public function login(){
        $email = $_POST['email'];
        $contrase = $_POST['contrase'];
        $array =array(); 
        array_push($array , $email);
        array_push($array ,$contrase);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","login",$array);
        echo json_encode($json);
    }
    public function menu(){
        $token = $_POST['token'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","menu",$token);
        echo json_encode($json);
    }
    public function verify(){
        $mailClient = $_POST['correo'];
        $tokenVerify = Content::loadModel(MODEL_MODEL_LOGIN,"login_model","tokenVerify",$mailClient);
        $type = 'alta';
        $message = 'Para activar su cuenta en KIWEAR pulse en el siguiente enlace';
        $mailKiwear = 'KiwearSupport@info.com';
        $info = array();
        array_push($info,$mailClient);
        array_push($info,$type);
        array_push($info,$message);
        array_push($info,$mailKiwear);
        array_push($info,$tokenVerify);
        $json = array();
        $json = Mail::dataMail($info);
        echo json_encode($json);
    }
    public function verify_user(){
        // header("Location: http://localhost/PHP_AngularJS/#/login");
        // $tokenVeri = $_GET['param'];
        // $correo = $_GET['param2'];
        // $arryArguments = array();
        // array_push($arryArguments,$tokenVeri);
        // array_push($arryArguments,$correo);
        // if ($tokenVeri && $correo){
        //     $json = array();
        //     $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","verifyUser",$arryArguments);
        // }
        
        echo 'holaa';
    }
    public function recover(){
        $email = $_POST['email'];
        $tokenVerify = Content::loadModel(MODEL_MODEL_LOGIN,"login_model","recover",$email);
        $type = 'recover';
        $message = 'Para cambiar su contraseña en KIWEAR pulse en el siguiente enlace';
        $mailKiwear = 'KiwearSupport@info.com';
        $info = array();
        array_push($info,$email);
        array_push($info,$type);
        array_push($info,$message);
        array_push($info,$mailKiwear);
        array_push($info,$tokenVerify);
        $json = array();
        $json = Mail::dataMail($info);
        echo json_encode($json);
    }
    public function recover_password(){
        // header("Location: http://localhost/FrameworkPHP/login/recoverView");
        $correo = $_POST['email'];
        $NewContra = $_POST['NewContrase'];
        $arryArguments = array();
        array_push($arryArguments,$correo);
        array_push($arryArguments,$NewContra);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","recoverPass",$arryArguments);
        echo json_encode($json);
        }
    public function socialGit(){
        $email = $_POST['email'];
        $name = $_POST['name'];
        $id = $_POST['id'];
        $arryArguments = array();
        array_push($arryArguments,$email);
        array_push($arryArguments,$name);
        array_push($arryArguments,$id);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","socialGit",$arryArguments);
        echo json_encode($json);
    }
    public function socialGoogle(){
        $email = $_POST['email'];
        $name = $_POST['name'];
        $id = $_POST['id'];
        $arryArguments = array();
        array_push($arryArguments,$email);
        array_push($arryArguments,$name);
        array_push($arryArguments,$id);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_LOGIN,"login_model","socialGoogle",$arryArguments);
        echo json_encode($json);
    }
}
