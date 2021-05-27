<?php
class controller_shop{
    // public function list(){
    //     require INC_PATH."header.php";
    //     require INC_PATH."menu.html";
    //     Content::LoadView("shop","shop");
    //     // include (INC_PATH."footer.php");
    // }
    public function listar(){
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","listar");
        echo json_encode($json);
    }
    public function show(){
        $nom = $_POST["nombre"];
        // $nom = 'Camiseta';
        $offset = 0;

        $array = array();
        array_push($array, $nom);
        array_push($array ,$offset);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","show",$array);
        echo json_encode($json);
    }
    public function countProds(){
        $nom = $_POST['nom'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","countProds",$nom);
        echo json_encode($json);
    }
    public function details(){
        $codigo = $_POST['codigo'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","details",$codigo);
        echo json_encode($json);
    }
    public function filters(){
        $nom = $_POST['nombre'];
        $marcas = $_POST['marca'];
        $tallas = $_POST['talla'];
        $offset = 0;
        $array = array();
        array_push($array, $nom);
        array_push($array, $marcas);
        array_push($array ,$tallas);
        array_push($array ,$offset);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","filters",$array);
        echo json_encode($json);
    }
    public function filters2(){
        $marcas = $_POST['marca'];
        $tallas = $_POST['talla'];
        $offset = 0;
        $array = array();
        array_push($array, $marcas);
        array_push($array ,$tallas);
        array_push($array ,$offset);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","filters2",$array);
        echo json_encode($json);
    }
    public function search(){
        $consulta = $_POST['consulta'];
        $nom = $_POST['nom'];
        $offset = $_POST['offset'];
        $array = array();

        array_push($array, $consulta);
        array_push($array, $nom);
        array_push($array ,$offset);
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","search",$array);
        echo json_encode($json);
    }
    public function showLikes(){
        $usuario = $_POST['usuario'];
        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","showLikes",$usuario);
        echo json_encode($usuario);
    }
    public function favorites(){
        $codArticulo = $_POST['codArticulo'];
        $codUsuario = $_POST['nomUsuario'];
        $array = array();
        array_push($array, $codArticulo);
        array_push($array, $codUsuario);

        $json = array();
        $json = Content::LoadModel(MODEL_MODEL_SHOP,"shop_model","favorites",$array);
        echo json_encode($json);
    }
}