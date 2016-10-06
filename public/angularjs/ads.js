var mainApp = angular.module('mainApp');

mainApp.controller('adsController',function($scope,$http){
	console.log("ads controller called");


	$http({
			method: 'GET',
			url: '/getAds'
				}).success(function(data){
					$scope.items = data.ads;
					$scope.itemsincart = data.itemsincart;
					$scope.orderedqts = data.orderedquantities;
					console.log(data);

				}).error(function(){
					alert("error");			
				});

	



	$scope.addItem = function(product,orderQuantity)
  {

  	console.log(orderQuantity);
  	 $http.post('/addItem',{"product":product,"quantity":orderQuantity})
  	 .then(function (response)

  	 {
  	 	console.log(JSON.stringify(response.data));
  	 	if(response.data.statusCode==200)
  	 	{
  	 	
  	 		$scope.itemsincart = response.data.itemsincart;
  	 		$scope.orderedqts = response.data.orderedquantities;
  	 	}
  	 }


  	 )
  }

});