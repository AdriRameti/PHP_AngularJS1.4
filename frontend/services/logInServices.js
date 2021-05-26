kiwear.factory('logInServices', ['$rootScope', function(){

        var service = {loadMenu:loadMenu,logOut:logOut};
        return service;
    function loadMenu($rootScope,services){

        var token1 = localStorage.getItem('token');
        if(token1){
            var token = token1.replace(/['"]+/g, '');
            menu = services.post('login','menu',{token:token}).then(function(data){
                localStorage.setItem('nom',data[0].nombre);
                var tipo = data[0].tipo;
                switch(tipo){
                    case 'Cliente':
                        $rootScope.userCard = true;
                        $rootScope.menu = data;
                        break;
                    case 'Admin':
                        break;
                }
                
            });
        }else{
            $rootScope.userCard = false;
        }
    }
    function logOut($rootScope){
        localStorage.removeItem('token');
        $rootScope.userCard = false;
    }
}]);