angular
	.module("myApp", ['ngMockE2E','ngAnimate'])

	.run(function($httpBackend){
		$httpBackend.whenPOST('/valid').respond(function(method, url, data) {
			return [200, {'valid':false}, {}];
		});
	})

	.controller("RegisterCtrl", function ($scope, $http) {
		$scope.showRegister = false;
		$scope.validate = function(){
			$http.post('/valid', $scope.user).then(function(response){
				if (!response.data.valid){
					$scope.showRegister = true;
					$(".form-login").hide();
					console.log(response.data.valid);
				}
			});
		};
	})
;