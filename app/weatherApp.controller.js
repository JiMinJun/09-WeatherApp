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
        vm.getMyWeather = getWeather;
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
        
        vm.city = vm.cities[0];


        function getWeather(city) {
            vm.city.name = city;
           WeatherAppFactory.getWeather(vm.city.name).then(
                function(response) {
                    vm.Weather = response.data;
                },
                function(error) {
                    $log.error('failure getting data', error)
                });
            vm.city.searchTime = moment().format('YYYY-MM-DD h:mm:ss a');
            vm.searchHistory.push(vm.city);
            vm.city = {};
        }

        function activate() {
            vm.getMyWeather(vm.city.name);         
        }

        activate();

        
    }
})();