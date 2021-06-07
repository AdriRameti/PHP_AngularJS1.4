<?php
class cart_dao{
    static $_instance;
    private function __construct() {
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_showCart($db,$user){
        $sql = "SELECT r.codigo,r.img,r.precio,l.cantidad, (r.precio*l.cantidad) as subtotal from ropa r inner join liniafact l ON r.codigo=l.codProd where l.codUser = '$user';";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    public function delete_Cart($db,$user){
        $sql = "DELETE FROM liniafact where codUser='$user'";
        return $db->ejecutar($sql);

    }
    public function update_cantity($db,$arryArguments){
        $codProd = $arryArguments[0];
        $cantidad = $arryArguments[1];
        $sql = "UPDATE liniafact SET cantidad=$cantidad WHERE codProd=$codProd";
        return $db->ejecutar($sql);

    }
    public function less_cantity($db,$arryArguments){
        $codProd = $arryArguments[0];
        $cantidad = $arryArguments[1];
        $sql = "UPDATE liniafact SET cantidad=$cantidad WHERE codProd=$codProd";
        return $db->ejecutar($sql);

    }
    public function delete_item($db,$arryArguments){
        $codProd = $arryArguments;
        $sql = "DELETE FROM liniafact WHERE codProd=$codProd";
        // die($sql);
        return $db->ejecutar($sql);

    }
    public function insert_item($db,$arryArguments){
        $usuario = $arryArguments[0];
        $codArticulo = $arryArguments[1];
        $sql = "INSERT INTO liniafact (codProd,codUser,cantidad) VALUES ($codArticulo,'$usuario','1')";
        // die($sql);
        return $db->ejecutar($sql);

    }
    public function validate_items($db,$arryArguments){
        $usuario = $arryArguments[0];
        $codArticulo = $arryArguments[1];
        $sql = "SELECT * FROM liniafact WHERE  codUser='$usuario' AND codProd=$codArticulo";
        // die($sql);
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function validate_cantity($db,$arryArguments){
        $codProd = $arryArguments[0];
        $sql = "SELECT cantidad FROM liniafact where codProd=$codProd";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

}