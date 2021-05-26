kiwear.controller('controller_home', function($scope,$window,categories) {
    let cat =3;
    let total = categories.length;
    $scope.categories = categories.slice(0, cat);

    angular.element($window).on('mousewheel',function(){
        let mediumHeight = document.getElementById('medium').offsetHeight;
        let position = $window.scrollY + mediumHeight;
        if (position >=1700) {
           
            if (cat < total) {
                cat += 3;
                $scope.categories = categories.slice(0, cat);
                $scope.$apply();
            }// end_else
        }else if(position<1700){
            if(cat > 3){
                cat -= 3;
                $scope.categories = categories.slice(0, cat);
                $scope.$apply();
            }
        }// end_if
    });
    $scope.rediShop = function(nombre){
        var nom = nombre;
        localStorage.setItem('nombre',nom);
        window.location.href="#/shop/"
    };
});