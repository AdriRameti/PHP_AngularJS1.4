kiwear.controller('controller_details', function($scope,services,details,$http) {
    console.log(details[0].nombre);

$scope.details = details;
$http.get("https://www.googleapis.com/books/v1/volumes?q="+details[0].nombre).then(function(data){
    console.log(data);
    $scope.apiDet = data.data.items;
    console.log($scope.apiDet);

});
});