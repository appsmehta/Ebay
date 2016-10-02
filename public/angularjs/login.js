var login = angular.module('login', []);
//defining the login controller
login.controller('loginController', function($scope, $http,$window,$location) {

	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.selectedSignIn = true;
	$scope.selectedRegister = true;


	$scope.selectedSigninTab = function()
	{
		alert("inside");
		$scope.selectedSignIn = false;
		$scope.selectedRegister = true;

	};
	$scope.selectedRegisterTab = function()
	{
		$scope.selectedSignIn = true;
		$scope.selectedRegister = false;

	};
	//$scope.validlogin = true;
	$scope.authenticate = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username,
				"password" : $scope.password
			}
		}).success(function(data) {
			alert(JSON.stringify(data));
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.validlogin = true;
			}
			else
				{
				$scope.valid=true;
				}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.valid=true;
		});
	};

	$scope.register = function() { 

		$http({

			method : "POST",
			url:'/Register',
			data : {

				"inputemail" : $scope.email,
				"inputreenteredemail" : $scope.reenteredemail,
				"inputpassword" : $scope.password,
				"inputfirstName" : $scope.firstName,
				"inputlastName" : $scope.lastName

			}
		}).success(function(data){
			alert("Inside success");
			alert(data);
			var landingUrl =   $window.location.host+"/";
        alert(landingUrl);
        window.location.assign('/');

		}).error(function(error){

		});

	};

});