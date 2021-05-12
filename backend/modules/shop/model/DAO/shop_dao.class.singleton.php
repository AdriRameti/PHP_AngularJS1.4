<?php
class shop_dao{
    static $_instance;
    private function __construct() {
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function select_list($db){
        $sql = "SELECT * FROM ropa";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_show($db,$arryArguments){
        $nom = $arryArguments[0];
        $offset = $arryArguments[1];
        $sql = "SELECT codigo,nombre,marca,img,precio FROM ropa WHERE nombre='$nom' order by visitas DESC LIMIT $offset,3";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_countProds($db,$arryArguments){
        $nom = $arryArguments;
        $sql = "SELECT count(*) AS prod FROM ropa WHERE nombre='$nom'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_details($db,$arryArguments){
        $codigo = $arryArguments;
        $sql = "SELECT r.nombre,r.marca,r.descripcion,r.precio,d.talla1,d.talla2,d.talla3,d.talla4,d.descriptotal,i.img1,i.img2,i.img3,i.img4 FROM imagenes i INNER JOIN ropa r INNER JOIN details d 
        where i.codigo=$codigo AND d.codigo=$codigo AND r.codigo=$codigo AND i.codigo=r.codigo AND i.codigo=d.codigo AND r.codigo=d.codigo";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_filters($db,$arryArguments){
        $nombres = $arryArguments[0];
        $marca = $arryArguments[1];
        $talla = $arryArguments[2];
        $offset = $arryArguments[3];
        $sql = "SELECT codigo,nombre,marca,img,precio FROM ropa WHERE nombre='$nombres' AND (marca='$marca' OR talla='$talla') order by visitas DESC LIMIT $offset,3";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_search($db,$arryArguments){
        $consulta = $arryArguments[0];
        $nom = $arryArguments[1];
        $offset = $arryArguments[2];
        $sql = "SELECT codigo,nombre,marca,img,precio FROM ropa WHERE nombre='$nom' AND (nombre LIKE '%$consulta%' OR marca LIKE '%$consulta%') order by visitas DESC LIMIT $offset,3";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_showLikes($db,$arryArguments){
        $user = $arryArguments;
        $sql = "SELECT * FROM favoritos where nomUser='$user'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_favorites($db,$arryArguments){
        $codigo = $arryArguments[0];
        $nombre = $arryArguments[1];
        $sql = "INSERT INTO favoritos (codArticulo,nomUser,favorito) VALUES ($codigo,'$nombre',0)";
        return $db->ejecutar($sql);
    }
    public function delete_favorites($db,$arryArguments){
        $codigo = $arryArguments[0];
        $sql = "DELETE FROM favoritos where codArticulo=$codigo";
        return $db->ejecutar($sql);
    }
    public function update_likeUp($db,$arryArguments){
        $codigo = $arryArguments[0];
        $sql = "UPDATE favoritos SET favorito=1 WHERE codArticulo=$codigo";
        return $db->ejecutar($sql);
    }
    public function update_unlike($db,$arryArguments){
        $codigo = $arryArguments[0];
        $sql = "UPDATE favoritos SET favorito=0 WHERE codArticulo=$codigo";
        return $db->ejecutar($sql);
    }
    public function valida_favorites($db,$arryArguments){
        $codigo = $arryArguments[0];
        $sql = "SELECT favorito FROM favoritos where codArticulo=$codigo";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
