<?php
   require MODEL_DAO_SHOP."shop_dao.class.singleton.php";
class shop_bll{
    private $dao;
    private $db;
    static $_instance;

    private function __construct()
    {
        $this->dao = shop_dao::getInstance();
        $this->db = db::getInstance();
    }
    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function listar(){
        return $this->dao->select_list($this->db);
    }
    public function show($arryArguments){
        return $this->dao->select_show($this->db,$arryArguments);
    }
    public function countProds($arryArguments){
        return $this->dao->select_countProds($this->db,$arryArguments);
    }
    public function details($arryArguments){
        return $this->dao->select_details($this->db,$arryArguments);
    }
    public function filters($arryArguments){
        return $this->dao->select_filters($this->db,$arryArguments);
    }
    public function filters2($arryArguments){
        return $this->dao->select_filters2($this->db,$arryArguments);
    }
    public function search($arryArguments){
        return $this->dao->select_search($this->db,$arryArguments);
    }
    public function showLikes($arryArguments){
        $likes = $this->dao->select_showLikes($this->db,$arryArguments);
        // return $this->dao->select_showLikes($this->db,$arryArguments);
        $arry = array();
        foreach ($likes as $valor){
            array_push($arry,$valor);
        }
        echo json_encode($arry);
        exit;
    }
    public function favorites($arryArguments){
        try{
            $val = $this->dao->count_favorites($this->db,$arryArguments);
            // echo json_encode($val);
            // exit;
        }catch(Exception $e){

        }
        foreach($val as $index => $value){
                $cont = $value['contar'];
        }
        if($cont==0){
            $this->dao->insert_favorites($this->db,$arryArguments);
            try{
            
                $check = $this->dao->valida_favorites($this->db,$arryArguments);
            }catch(Exception $e){
                return ('error validacion fav');
                exit;
            }
            foreach($check as $index => $value){
                $fav = $value['favorito'];
            }
            // echo json_encode($fav);
            // exit;
            if($fav==0){
            $like = $this->dao->update_likeUp($this->db,$arryArguments);
    
                if ($like == true){
                    $valLike = 1;
                    return $valLike;
                }else if($like == false){
                    return 'Error like';
                }
    
            }else if($fav==1){
    
                try{
                    $this->dao->delete_favorites($this->db,$arryArguments);
                $unlike =  $this->dao->update_unlike($this->db,$arryArguments);
    
                }catch(Exception $e){
                    return ('error unlike');
                    exit;
                }
    
                if ($unlike == false){
    
                }else if ($unlike == true){
                    $valLike = 2;
                    return $valLike;
                }
            }
        }else{
            try{
            
                $check = $this->dao->valida_favorites($this->db,$arryArguments);
            }catch(Exception $e){
                return ('error validacion fav');
                exit;
            }
            foreach($check as $index => $value){
                $fav = $value['favorito'];
            }
            // echo json_encode($fav);
            // exit;
            if($fav==0){
            $like = $this->dao->update_likeUp($this->db,$arryArguments);
    
                if ($like == true){
                    $valLike = 1;
                    return $valLike;
                }else if($like == false){
                    return 'Error like';
                }
    
            }else if($fav==1){
    
                try{
                    $this->dao->delete_favorites($this->db,$arryArguments);
                $unlike =  $this->dao->update_unlike($this->db,$arryArguments);
    
                }catch(Exception $e){
                    return ('error unlike');
                    exit;
                }
    
                if ($unlike == false){
    
                }else if ($unlike == true){
                    $valLike = 2;
                    return $valLike;
                }
            }
        }

    }
}