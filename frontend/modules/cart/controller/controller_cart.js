kiwear.controller('controller_cart', function($scope,services) {
    var user = localStorage.getItem('nom');
    if(localStorage.getItem('token')){
        mostrar = services.post('cart','showCart',{user:user}).then(function(data){
            // console.log($scope.mostrar);
            $scope.mostrar = data;
        });
    }

    $scope.less = function(index,codigo){

        var codProd = codigo;
        $scope.mostrar[index].cantidad = parseInt($scope.mostrar[index].cantidad) - 1;
        var cantidad = $scope.mostrar[index].cantidad;
        less = services.post('cart','less_cantity',{codProd:codProd,cantidad:cantidad}).then(function(data){
            console.log(data);
            if(data==0){
                $scope.mostrar[index].cantidad = 0;
                delet = services.post('cart','delete_item',{codProd:codProd}).then(function(data){
                    console.log(data);
                });
            }
        });
    }
    $scope.more = function(index,codigo){
        // console.log($scope.mostrar[index].cantidad);

        var codProd = codigo;
        $scope.mostrar[index].cantidad = parseInt($scope.mostrar[index].cantidad) + 1;
        var cantidad = $scope.mostrar[index].cantidad;
        more = services.post('cart','update_cantity',{codProd:codProd,cantidad:cantidad}).then(function(data){
            console.log(data);
        });
    }
    // $scope.more = function(index,data){
    //     var codProd = data.codigo;
    //     var inde = index;
    //     less = services.post('cart','update_cantity',{codProd:codProd}).then(function(data){
    //         console.log(data[0].cantidad);
    //          cantidad = data[0].cantidad
    //          $scope.mostrar[inde].cantidad  = cantidad ;
    //          location.reload();
    //     });
        
    // }
});