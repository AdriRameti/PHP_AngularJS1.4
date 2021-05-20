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

    }).when("/login/verifyUser/:tokenVerify/:emailClient", 
    {templateUrl: "frontend/modules/login/view/login.html", 
    controller: "controller_login",
    resolve:{
        activateUser: function(services,$route){
            var tokenV = $route.current.params.tokenVerify;
            var emailCli = $route.current.params.emailClient;
            localStorage.setItem('tokenV',tokenV);
            localStorage.setItem('emailCli',emailCli);
            window.location.href="http://localhost/PHP_AangularJS/#/login";
        }
    }
    }).when("/login/recover", 
    {templateUrl: "frontend/modules/login/view/recover.html", 
    controller: "controller_login",

    })
}]);