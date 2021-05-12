kiwear.controller('controller_shop', function($scope,services,listar) {
if(localStorage.nombre){
    let nombreEnv = localStorage.nombre;
    console.log(nombreEnv);
    // let show = services.get('shop','show',{nombre: nombreEnv})
    $scope.listar = services.get('shop','show',{nombre: nombreEnv});
    console.log($scope.listar );
    // localStorage.removeItem('nombre');
}else{
    $scope.listar =listar;
}

});