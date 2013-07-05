angular.module('fuzzyoctohipster', ['$strap.directives']).config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
}).config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/',					{templateUrl: 'partials/list.html'}).
		when('/filter/:query',					{templateUrl: 'partials/list.html'}).
		when('/add',					{templateUrl: 'partials/add.html' }).
		when('/update/:id',				{templateUrl: 'partials/update.html' }).
		when('/delete/:id',				{templateUrl: 'partials/delete.html' }).
		otherwise({redirectTo: '/'});
}]);

function itemListController($scope, $routeParams, $http) {

	$scope.query = $routeParams.query;

	$http.get('item/').success(function(data){
		$scope.items = data;
	});

	$scope.click = function(item){
		$http.put('item/clicked/'+item._id).success(function(data) {
			item.click = data.click;
		});
	};

	$scope.emailFilter = function(email){
		$scope.query = email ;
	};
}

function itemAddController($scope, $routeParams, $http, $location) {

	$scope.item ={};
	$scope.item.title = '';
	$scope.item.url = 'http://';

	$scope.add = function(){
		$http.post('item/', $scope.item).success(function(data) {
			$location.path('');
		});
	};
}

function itemUpdateController($scope,  $http, $routeParams, $location){
	$http.get('item/'+$routeParams.id).success(function(data){
		$scope.item = data[0];
	});

	$scope.update = function(){
		$http.put('item/'+$routeParams.id, $scope.item).success(function(data){
			$location.path('');
		});
	};
}

function itemDeleteController($scope,  $http, $routeParams, $location){
	$http.get('item/'+$routeParams.id).success(function(data){
		$scope.item = data[0];
	});

	$scope.delete = function(){
		$http.delete('item/'+$routeParams.id).success(function(data){
			$location.path('');
		});
	};
}
