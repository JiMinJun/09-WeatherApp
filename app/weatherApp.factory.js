(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .factory('WeatherAppFactory', WeatherAppFactory);

    WeatherAppFactory.$inject = [ '$http', '$q', '$log'];

    /* @ngInject */
    function WeatherAppFactory( $http, $q, $log) {
        var service = {
            getWeather: getWeather
        };
        return service;

        function getWeather(city) {
            var cityName = city;
            var defer = $q.defer();
            var url = 'http://api.openweathermap.org/data/2.5/weather';
            console.log(city);

            $http({
               method: 'GET',
               url: url,
               params: {
                q: cityName,
                mode: 'json',
                units: 'imperial',
                appid: '7a04e5f260046912d7a7857eb0bd2b66'
                }
           })
            .then(
                function (response) {
                    if(typeof response.data === 'object') {
                        defer.resolve(response);
                        toastr.success("Weather for " + city);
                    }
                    else {
                        defer.reject(response);
                        toastr.warning("No weather found <br/>" + response.config.url);
                    }
                }, 
                function(error) {
                   defer.reject(error);
                   $log.error(error);
                   toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
               });
            return defer.promise;
            
        }
    }
})()