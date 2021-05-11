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
})
}]);