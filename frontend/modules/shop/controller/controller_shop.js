kiwear.controller('controller_shop', function($scope,services,listar) {

if(localStorage.nombre){
    let nombreEnv = localStorage.nombre;
    let usuario = localStorage.getItem('nom');
    // showLikes = services.post('shop','showLikes',{usuario:usuario}).then(function(res){
        // if(res.length==0){
            listar = services.post('shop','show',{nombre: nombreEnv}).then(function(data) {
                $scope.listar = data;
                var usuario=localStorage.getItem('nom');

                listarLikes = services.post('shop','showLikes',{usuario: usuario}).then(function(data2) {
                    var codigo=data2[0].codArticulo;
                    if(data2.length==1){
                        var element = angular.element(document.querySelector('#A-'+codigo));
                        element.addClass('cora-sty');
                        console.log(element);
                    }else{
                        var element2 = "";
                        for (row in data2){
                            if (data2[row].favorito==1){
                                
                                element2 = angular.element(document.querySelector('#A-'+data2[row].codArticulo));
                                element2.addClass('cora-sty');
                            } 
                        }
                    }

                });
                localStorage.removeItem('nombre');
            });

}else{
    $scope.listar =listar;
    var usuario=localStorage.getItem('nom');
    listarLikes = services.post('shop','showLikes',{usuario: usuario}).then(function(data2) {
        var codigo=data2[0].codArticulo;
        if(data2.length==1){
            var element = angular.element(document.querySelector('#A-'+codigo));
            element.addClass('cora-sty');
            console.log(element);
        }else{
            var element2 = "";
            for (row in data2){
                if (data2[row].favorito==1){
                    
                    element2=angular.element(document.querySelector('#A-'+data2[row].codArticulo));
                    element2.addClass('cora-sty');
                } 
            }
        }

    });
}
$scope.details= function(codigo){
localStorage.codigo = codigo;
location.href = "#/details";
}
$scope.validaFilters = function(){
    sessionStorage.filtrado = 0;
    var marca="";
    var talla="";
        if (document.filtrosShop.marca1.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca1.value;
        }else if (document.filtrosShop.marca2.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca2.value;

        }else if (document.filtrosShop.marca3.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca3.value;

        }else if (document.filtrosShop.marca4.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca4.value;

        }else if (document.filtrosShop.marca5.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca5.value;

        }else if (document.filtrosShop.marca6.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca6.value;

        }else if (document.filtrosShop.marca7.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca7.value;

        }else if (document.filtrosShop.marca8.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca8.value;

        }else if (document.filtrosShop.marca9.checked){
            var filtrado=1;
             marca=document.filtrosShop.marca9.value;
        }else {
             marca="";
        }
        if (document.filtrosShop.talla1.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla1.value;
        }else if (document.filtrosShop.talla2.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla2.value;
        }else if (document.filtrosShop.talla3.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla3.value;
        }else if (document.filtrosShop.talla4.checked){
            var filtrado=1;
             talla=document.filtrosShop.talla4.value;
        }else {
             talla="";
        }
        if(marca=="" && talla==""){
            filtrado=0;
        }
        $scope.aplicar = function(){
            let nombreEnv = localStorage.nombre;
            if(nombreEnv){
                if(filtrado==1){
                    listar = services.post('shop','filters',{nombre: nombreEnv,marca:marca,talla:talla}).then(function(data) {
                        $scope.listar = data;
                    });
                }
            }else{
                listar = services.post('shop','filters2',{marca:marca,talla:talla}).then(function(data) {
                    // var data = data2
                    // console.log(data);
                    $scope.listar = data;
                });
            }
        }
}
$scope.removeFilters = function(){
    let nombreEnv = localStorage.nombre;
    if(nombreEnv){
        listar = services.post('shop','show',{nombre: nombreEnv}).then(function(data) {
            console.log(data);
            $scope.listar = data;
            document.filtrosShop.marca1.checked = false;
            document.filtrosShop.marca2.checked = false;
            document.filtrosShop.marca3.checked = false;
            document.filtrosShop.marca4.checked = false;
            document.filtrosShop.marca5.checked = false;
            document.filtrosShop.marca6.checked = false;
            document.filtrosShop.marca7.checked = false;
            document.filtrosShop.marca8.checked = false;
            document.filtrosShop.marca9.checked = false;
            document.filtrosShop.talla1.checked = false;
            document.filtrosShop.talla2.checked = false;
            document.filtrosShop.talla3.checked = false;
            document.filtrosShop.talla4.checked = false;
        });
    }else{
        document.filtrosShop.marca1.checked = false;
        document.filtrosShop.marca2.checked = false;
        document.filtrosShop.marca3.checked = false;
        document.filtrosShop.marca4.checked = false;
        document.filtrosShop.marca5.checked = false;
        document.filtrosShop.marca6.checked = false;
        document.filtrosShop.marca7.checked = false;
        document.filtrosShop.marca8.checked = false;
        document.filtrosShop.marca9.checked = false;
        document.filtrosShop.talla1.checked = false;
        document.filtrosShop.talla2.checked = false;
        document.filtrosShop.talla3.checked = false;
        document.filtrosShop.talla4.checked = false;
    }
        // localStorage.removeItem('nombre');
    
}

$scope.favorito = function(codigo){
    if(localStorage.getItem('token')){
        var codArticulo = codigo;
        var nomUsuario = localStorage.getItem('nom');
        like = services.post('shop','favorites',{codArticulo:codArticulo,nomUsuario:nomUsuario}).then(function(data){
            console.log(data);
            if(data==1){

                var element = angular.element(document.querySelector('#A-'+codigo));
                element.addClass('cora-sty');
            }else if(data==2){
                var element = angular.element(document.querySelector('#A-'+codigo));
                element.removeClass('cora-sty');
            }
        });
    }else{
        window.location.href="#/login";
    }
    
}
$scope.addCart = function(codigo){

    if (localStorage.getItem('token')===null){
        window.location.href="/FrameworkPHP/login/list";
    }else{
        var usuario = localStorage.getItem('nom');
        var codArticulo =codigo;
        insert_item = services.post('cart','insert_item',{usuario:usuario,codArticulo:codArticulo}).then(function(data){
            console.log(data);
        });
    }
}
});