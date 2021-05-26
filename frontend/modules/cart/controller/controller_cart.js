kiwear.controller('controller_cart', function($scope,services) {
    var user = localStorage.getItem('nom');
    mostrar = services.post('cart','showCart',{user:user}).then(function(data){
        console.log(data);
        $scope.mostrar = data;

    });
});