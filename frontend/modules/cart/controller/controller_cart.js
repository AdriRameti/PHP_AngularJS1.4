kiwear.controller('controller_cart', function($scope,services) {
    var user = localStorage.getItem('nom');
    mostrar = services.post('cart','showCart',{user:user}).then(function(data){
        console.log(data);
        $scope.mostrar = data;

    });
    $scope.less = function(){
        less = services.post('cart','update_cantity').then(function(data){
            console.log(data);
            var user = localStorage.getItem('nom');
            updt = services.post('cart','showCart',{user:user}).then(function(data){
                console.log(data);
                // $scope.mostrar.
            });
        });
    }
    $scope.more = function(){

    }
});