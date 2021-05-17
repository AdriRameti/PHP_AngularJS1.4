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
    // resolve: {
    //     details: function(services){
    //         return services.post('shop','details',{'codigo' : localStorage.codigo});
    //     }
    // }
    }).when("/register", 
    {templateUrl: "frontend/modules/login/view/register.html", 
    controller: "controller_login",
    // resolve: {
    //     details: function(services){
    //         return services.post('shop','details',{'codigo' : localStorage.codigo});
    //     }
    // }
    })
}]);