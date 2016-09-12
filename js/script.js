angular
	.module("myApp", ['ngMockE2E','ngAnimate'])

	.run(function($httpBackend){

		$httpBackend.whenPOST('/valid').respond(function(method, url, data) {
			return [200, {'valid':false}, {}];
		});
		$httpBackend.whenPOST('/register').respond(function(method, url, data) {
			return [200, {'user': {'name': 'Laura', 'lastname': 'Parra', 'email': 'lauraparra89@gmail.com', 'pass' : '123456'}}, {}];
		});
		$httpBackend.whenPOST('/answers').respond(function(method, url, data) {
			return [200, {'answers': {'a1': 'Japon', 'a2': '', 'a3': '', 'a4' : ''}}, {}];
		});
	})

	.controller("RegisterCtrl", function ($scope, $http) {
		$scope.showRegister = false;
		$scope.showAnswers = false;
		$scope.validate = function(){
			$http.post('/valid', $scope.user).then(function(response){
				if (!response.data.valid){
					$scope.showRegister = true;
					$(".form-login").hide();
					console.log(response.data.valid);
					$http.post('/register', $scope.user).then(function(response){
						console.log(response);
					});
				}else{
					$scope.showAnswers = true;
					$http.post('/answers', $scope.user).then(function(response){
						console.log(response);
					});
				}
			});
		};
		$scope.registerf = function(){
			$http.post('/answers', $scope.user).then(function(response){
				$(".form-register").hide();
				$scope.showAnswers = true;
				console.log(response);
			});
		};
	})


;