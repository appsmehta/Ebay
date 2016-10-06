var mainApp = angular.module('mainApp');

mainApp.controller('aboutController',function($scope,$http,sessionservice){

			$scope.loggedinuser = sessionservice.getuserdetails();

			

				$http({
						method: 'GET',
						url: '/aboutProfile'
				}).success(function(data){
					alert("printing response");
					alert(JSON.stringify(data));
					$scope.aEmail = data.email;
					$scope.afirstName = data.firstName;
					$scope.alastName = data.lastName;
					$scope.ahandle = data.handle;
					$scope.abday =  new Date(data.birthday);
					$scope.acontact = data.contactinfo;
					$scope.alocation = data.location;



				}).error(function(){
					alert("error");			
				});


		 $scope.updateAbout = function () 
		 {

		 	 $http ({

		 	 		method : 'POST',
		 	 		url: '/updateAbout',
			 	 	data:{
								"email" : $scope.aEmail,
								"firstName" : $scope.afirstName,
								"lastName" : $scope.alastName,
								"handle" : $scope.ahandle,
								"birthday" : $scope.abday,
								"contactinfo": $scope.acontact,
								"location" : $scope.alocation,
							}
			 		})

		 	 .success (function(data)
		 	 	{
		 	 		alert("profile updated");
		 	 		}


		 	 )
		 	 .error(function(){
					alert("error");			
					});



		 	 
		 }

			

		





		});

