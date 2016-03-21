(function(){

	angular.module('requestService')
	.service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

   function RequestsService($http, $q, $ionicLoading){

        var base_url = 'https://1da5087f.ngrok.io';

        function register(device_token){

            var deferred = $q.defer();
     

            $http.post(base_url + '/register', {'device_token': device_token})
                .success(function(response){

           
                    deferred.resolve(response);

                })
                .error(function(data){
             
                    deferred.reject();
                });


            return deferred.promise;

        };


        return {
            register: register
        };
    }
})();