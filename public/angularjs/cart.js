var mainApp = angular.module("mainApp");

mainApp.controller("checkoutController",function($scope,$http)

{

  $http.get('/getCart')

  		.success(function(data)
  		{

  			$scope.itemsincart = data.itemsincart;
  			$scope.orderedquantities = data.orderedquantities;
  			$scope.cost = data.cost;



  		})





}


	)