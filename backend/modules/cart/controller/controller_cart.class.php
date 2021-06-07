<?php
class controller_cart{
    public function list(){
        require INC_PATH."header.php";
        require INC_PATH."menu.html";
        Content::LoadView("cart","cart");
        include (INC_PATH."footer.php");
    }
    public function showCart(){
        $user = $_POST['user'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_CART,"cart_model","showCart",$user);
        echo json_encode($json);
    }
    public function deleteCart(){
        $user = $_POST['user'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_CART,"cart_model","deleteCart",$user);
        echo json_encode($json);
    }
    public function update_cantity(){
        $codProd = $_POST['codProd'];
        $cantidad = $_POST['cantidad'];
        $array= array();
        array_push($array,$codProd);
        array_push($array,$cantidad);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_CART,"cart_model","update_cantity",$array);
        echo json_encode($json);
    }
    public function less_cantity(){
        $codProd = $_POST['codProd'];
        $cantidad = $_POST['cantidad'];
        $array = array();
        array_push($array,$codProd);
        array_push($array,$cantidad);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_CART,"cart_model","less_cantity",$array);
        echo json_encode($json);
    }
    public function delete_item(){
        $codProd = $_POST['codProd'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_CART,"cart_model","delete_item",$codProd);
        echo json_encode($json);
    }
    public function insert_item(){
        $usuario = $_POST['usuario'];
        $codArticulo = $_POST['codArticulo'];
        $array = array();

        array_push($array,$usuario);
        array_push($array,$codArticulo);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_CART,"cart_model","insert_item",$array);
        echo json_encode($json);
    }
    
}