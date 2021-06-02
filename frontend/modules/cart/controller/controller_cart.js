kiwear.controller('controller_cart', function($scope,services) {
    var user = localStorage.getItem('nom');
    mostrar = services.post('cart','showCart',{user:user}).then(function(data){
        console.log(data);
        $scope.mostrar = data;

    });
    $scope.less = function(index,codigo){
        console.log($scope.mostrar[index].cantidad);

        var codProd = codigo;
        // $scope.mostrar[index].cantidad = parseInt($scope.mostrar[index].cantidad) - 1
        less = services.post('cart','less_cantity',{codProd:codProd}).then(function(data){
            console.log(data);
             $scope.mostrar[index].cantidad  = data[0].cantidad;
        });
    }
    $scope.more = function(index,codigo){
        console.log($scope.mostrar[index].cantidad);
        var cantidad = 0;
        var codProd = codigo;
        var inde = index;
        less = services.post('cart','update_cantity',{codProd:codProd}).then(function(data){
            console.log(data[0].cantidad);
             cantidad = data[0].cantidad
             $scope.mostrar[inde].cantidad  = cantidad ;
        });
        
    }
});