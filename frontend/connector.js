kiwear.factory("services", ['$http','$q', function ($http, $q) {

    let urlBase = '/PHP_AngularJS/backend/index.php?page=';
    let obj = {};
        obj.get = function (module, functi) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                  method: 'GET',
                  url: urlBase + module + '&op=' + functi
              }).success(function(data, status, headers, config) {
                //   console.log(data);
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };
        
        obj.post = function (module, functi,dada) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                  method: 'POST',
                  url: urlBase + module + '&op=' + functi,
                  data:dada
              }).success(function(data, status, headers, config) {
                  // console.log(data.length);
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };
        return obj;
}]);