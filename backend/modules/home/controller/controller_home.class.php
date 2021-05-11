<?php
class controller_home{
    // public function list(){
    //     require INC_PATH."header.php";
    //     require INC_PATH."menu.html";
    //     Content::LoadView("home","home");
    //     include (INC_PATH."footer.php");
    // }
    public function categories(){
        // $json = array();
        echo  Content::LoadModel(MODEL_MODEL_HOME,"home_model","categories");
        // echo json_encode($json);
    }
    public function Slider(){
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_HOME,"home_model","Slider");
        echo json_encode($json);
    }
    public function searchHome(){
        $valor = $_POST['valor'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_HOME,"home_model","searchHome",$valor);
        echo json_encode($json);
    }
}