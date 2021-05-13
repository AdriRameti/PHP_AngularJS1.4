kiwear.controller('controller_shop', function($scope,services,listar) {
if(localStorage.nombre){
    let nombreEnv = localStorage.nombre;
    listar = services.post('shop','show',{nombre: nombreEnv}).then(function(d) {
        $scope.listar = d;
        localStorage.removeItem('nombre');
    });
}else{
    $scope.listar =listar;
}
});