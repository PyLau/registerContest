angular
	.module("myApp", ['ngMockE2E'])

	.run(function($httpBackend){
		$httpBackend.whenPOST('/valid').respond(function(method, url, data) {
			return [200, {'valid':false}, {}];
		});
	})

	.controller("RegisterCtrl", function ($scope, $http) {
		$scope.validate = function(){
			$http.post('/valid', $scope.user).then(function(response){
				if (!response.data.valid){
					showRegister = true;
					console.log(response.data.valid);
				}
			});
		};
	})
;