var kiwear = angular.module('kiwear',['ngRoute']);
kiwear.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
    .when("/home", 
    {templateUrl: "frontend/modules/home/view/home.html", 
    controller: "controller_home",
    resolve: {
        categories: function(services){
            return services.get('home','categories');
        }
    }
    }).when("/shop", 
    {templateUrl: "frontend/modules/shop/view/shop.html", 
    controller: "controller_shop",
    resolve: {
        listar: function(services){
            return services.get('shop','listar');
        }
    }
    }).when("/details", 
    {templateUrl: "frontend/modules/shop/view/shop_details.html", 
    controller: "controller_details",
    resolve: {
        details: function(services){
            return services.post('shop','details',{'codigo' : localStorage.codigo});
        }
    }
    }).when("/login", 
    {templateUrl: "frontend/modules/login/view/login.html", 
    controller: "controller_login",

    }).when("/register", 
    {templateUrl: "frontend/modules/login/view/register.html", 
    controller: "controller_login",

    }).when("/login/verify_user/:tokenVerify/:emailClient", 
    { controller: "controller_login",
    resolve:{
        activateUser: function(services,$route){
            var tokV = $route.current.params.tokenVerify;
            var emailCli = $route.current.params.emailClient;
            if (tokV || emailCli){
                verificar = services.post('login','verify_user',{emailCli:emailCli,tokV:tokV}).then(function(resultado) {
                        localStorage.removeItem('tokenV');
                        localStorage.removeItem('emailCli');
                        return location.href="http://localhost/PHP_AngularJS/#/login"
                    });
            }
        }
    }
    }).when("/login/confirm", 
    {templateUrl: "frontend/modules/login/view/verify.html", 
    controller: "controller_login",

    }).when("/login/recover", 
    {templateUrl: "frontend/modules/login/view/recover.html", 
    controller: "controller_login",
        
    })
}]);
kiwear.run(function($rootScope,logInServices){
    logInServices.loadMenu();

    $rootScope.logOut = function(){
        logInServices.logOut();
    }
});