'use strict';

describe("Weather API Factory", function() {
	var WeatherAppFactory, $httpBackend;

	//top level module
	beforeEach(module("WeatherApp"));
	//dependencies
	beforeEach(inject (function(_WeatherAppFactory_,  _$httpBackend_) {
		WeatherAppFactory = _WeatherAppFactory_;
		$httpBackend = _$httpBackend_;
	}));

	//verify each test was flushed
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	//make sure factory has a getWeather method
	it("should have a getWeather method", function() {
		expect(angular.isFunction(WeatherAppFactory.getWeather)).toBe(true);
	});

	//make sure getWeather works properly
	it("getWeather should successfully return Moscow", function() {
		$httpBackend
			.whenGET('http://api.openweathermap.org/data/2.5/weather?appid=7a04e5f260046912d7a7857eb0bd2b66&mode=json&q=Moscow&units=imperial')
			.respond({name: "Moscow"});

		WeatherAppFactory.getWeather('Moscow')
			.then(function(response) {
				expect(response.data.name).toBe('Moscow');
				expect(response.status).toBe(200);
				expect(response.data).toEqual({name: 'Moscow'});
			});
		$httpBackend.flush();
	});

	//makes sure getWeather fails if it does not get object
	it("getWeather should fail and return undefined since it is not an object", function() {
		$httpBackend
			.whenGET('http://api.openweathermap.org/data/2.5/weather?appid=7a04e5f260046912d7a7857eb0bd2b66&mode=json&q=Moscow&units=imperial')
			.respond("Moscow");

		WeatherAppFactory.getWeather('Moscow')
			.then(function(response) {
				expect(response).toBe(undefined);
			});
		$httpBackend.flush();
	});

	//makes sure getWeather catches errors properly
	it("getWeather will return an error code if api call fails", function() {
		var result;
		$httpBackend
			.whenGET('http://api.openweathermap.org/data/2.5/weather?appid=7a04e5f260046912d7a7857eb0bd2b66&mode=json&q=Moscow&units=imperial')
			.respond(500);

		WeatherAppFactory.getWeather('Moscow')
			.then(function(response) {
				result = response;
			},function(error) {
				expect(error.status).toBe(500);
				expect(result).toBe(undefined);
			});
		$httpBackend.flush();
	});
});