angular
	.module("myApp", ['ngMockE2E','ngAnimate'])

	.run(function($httpBackend){

		$httpBackend.whenGET('/validservice/').respond(function(method, url, data) {
			return [200, {'status':false}, {}];
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
			$http.get('/validservice/' + $scope.user.ci).then(function(response){
				if (!response.data.status){
					$scope.showRegister = true;
					$(".form-login").hide();
					console.log(response.data.status);
					$http.post('/register', data).then(function(response){
						console.log(response);
					});
				}else{
					$(".form-login").hide();
					registerFunction()
				}
			});
		};
		$scope.registerf = function(){
			$(".form-register").hide();
			registerFunction();
		};

		function registerFunction(){
			var data = $.param({
            	name: $scope.user.first_name,
            	lastName: $scope.user.last_name
           	});
			$http.post('/answers', data).then(function(response){
				console.log(data);
				$scope.showAnswers = true;
				console.log(response);
			});
		}
	})


;