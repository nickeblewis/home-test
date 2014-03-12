var app = angular.module("epos", ['ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.otherwise({
			templateUrl: 'products.html',
			controller: 'ProductsCtrl'
		})
}]);

app.controller('ProductsCtrl', function ($scope, $http) {
	$scope.phones = [];
	$http({method: 'get', url: 'json/phones.json'}).success(function (data) {
		$scope.phones = data.phones;
	})
});

app.controller('BasketCtrl', function ($scope, $http) {
});