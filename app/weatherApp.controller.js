(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('WeatherAppController', WeatherAppController);

    WeatherAppController.$inject = ['$log', 'WeatherAppFactory'];

    /* @ngInject */
    function WeatherAppController($log, WeatherAppFactory) {
        var vm = this;
        vm.searchHistory = [];
/*        vm.getMyWeather = getWeather;*/
        vm.cities = [
            {
                'name': "San Diego"
            },
            {
                'name': "New York"
            },
            {
                'name': "Washington D.C"
            },
            {
                'name': "London"
            },
            {
                'name': "Tokyo"
            }];
        
        


        vm.getMyWeather = function (city) {
           WeatherAppFactory.getWeather(city).then(
                function(response) {
                    vm.Weather = response.data;
                },
                function(error) {
                    vm.error = 'Failure getting Data';
                    $log.error('failure getting data', error)
                });
            vm.city = {name: city};
            vm.city.searchTime = moment().format('YYYY-MM-DD h:mm:ss a');
            vm.searchHistory.push(vm.city);
            vm.city = {};
        }

        function activate() {
            //getsWeather for first item cities array (san diego)
            vm.getMyWeather(vm.cities[0].name);         
        }

        activate();

        
    }
})();