kiwear.factory('logInServices', ['$rootScope', function(services,$rootScope){

        var service = {loadMenu:loadMenu,logOut:logOut};
        return service;
    function loadMenu(){

        var token = localStorage.getItem('token');
        if(token){
            // $rootScope.userCard = true;
        }else{
            // $rootScope.userCard = false;
        }
    }
    function logOut(){
        localStorage.removeItem('token');
        
    }
}]);