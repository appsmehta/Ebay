var mainApp = angular.module('mainApp', []);

mainApp.controller('mainController', [ '$scope', '$http', function($scope, $http) {

	$scope.clickedSignin = function()
	{
		alert("clicked");
				$http({
						method: 'GET',
						url: '/signIn'
				}).success(function(data){
					alert(data);
				}).error(function(){
					alert("error");			
				});
	}

}]);

