var app = angular.module("epos", ['ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/basket', {
			controller:'BasketCtrl',
			templateUrl:'basket.html'
		})
		.when('/view/:phoneid', {
			controller:'ViewCtrl',
			templateUrl:'view.html'
		})
		.otherwise({
			templateUrl: 'products.html',
			controller: 'ProductsCtrl'
		})
}]);

app.service('basket', function() {
	var basket = [];
	var total = 0;

	return {		
		addItem: function(data, qty) {
			basket.push(data);
			total += parseInt(data.price);
		},
		removeItem: function(data, qty) {
			basket.pop(data);
			total -= parseInt(data.price);
		},
		getItems: function() {
			return basket;
		},

		getTotal: function() {
			return total;
		}
	};
});

app.controller('ProductsCtrl', function ($scope, $http, basket) {
	$scope.phones = [];
	
	$scope.notification = "";

	$http({method: 'get', url: 'json/phones.json'}).success(function (data) {
		$scope.phones = data.phones;
	})

	$scope.addToBasket = function(index) {
		basket.addItem($scope.phones[index], 1);
		$scope.notification = "You have added a " + $scope.phones[index].name + " to your basket";
	};
});

app.controller('BasketCtrl', function ($scope, $http, basket) {


	$scope.notification = "";
	$scope.phones = basket.getItems();
	$scope.total = basket.getTotal();

	$scope.removeFromBasket = function(index) {
		basket.removeItem($scope.phones[index], 1);
		$scope.total = basket.getTotal();
		$scope.notification = "You have removed a " + $scope.phones[index].name + " to your basket";
	};
});

app.controller('ViewCtrl', function ($scope, $http, basket, $routeParams) {
	$http({method: 'get', url: 'json/phones.json'}).success(function (data) {
		$scope.phone = data.phones[$routeParams.phoneid];
	})
});

app.controller('NavCtrl', function ($scope, $http, $location) {
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});