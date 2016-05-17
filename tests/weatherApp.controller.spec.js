'use strict';

describe ('Weather App Controller' , function() {

	beforeEach(module('WeatherApp'));
	var $scope;
	var $controller;
	var $q;
	var deferred;
	var vm;

	describe('mock of weather factory', function() {
		beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, WeatherAppFactory) {
			$scope = _$rootScope_.$new();
			$controller = _$controller_;
			$q = _$q_;
			deferred = _$q_.defer();

			//Jasmine Spy to return the deferred object for getWeather method
			spyOn(WeatherAppFactory, 'getWeather').and.returnValue(deferred.promise);
/*			moment = jasmine.createSpy();*/

			//init controller, passing our spy servie
			vm = $controller('WeatherAppController', {
				$scope: $scope,
				WeatherAppFactory: WeatherAppFactory,
			});
		}));

		it('should return a promise', function() {
			deferred.resolve({data:[{name: 'Moscow'}]});

			$scope.$apply();

			expect(vm.Weather).not.toBe(undefined);
			expect(vm.Weather[0].name).toBe('Moscow');
			expect(vm.error).toBe(undefined);
		})

		it('should reject the promise', function() {
			deferred.reject();

			$scope.$apply();

			expect(vm.Weather).toBe(undefined);
			expect(vm.error).toBe('Failure getting Data');
			
		})

	})
	
})