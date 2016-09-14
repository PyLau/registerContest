angular
	.module("myApp", ['ngMockE2E','ngAnimate'])

	.run(function($httpBackend){

		$httpBackend.whenGET(new RegExp('\\/validservice\\/[0-9]+')).respond(function(method, url, data) {
			return [200, {'status':true}, {}];
		});
		$httpBackend.whenPOST('/register').respond(function(method, url, data) {
			return [200, {'answers': {'a1': '', 'a2': '', 'a3': '', 'a4' : ''}}, {}];
		});
		$httpBackend.whenPOST('/answers').respond(function(method, url, data) {
			return [200, {'answers': {'a1': 'Japon', 'a2': '', 'a3': '', 'a4' : ''}}, {}];
		});
	})

	.controller("RegisterCtrl", function ($scope, $http) {
		$scope.showRegister = false; //primera pantalla sin registro
		$scope.showAnswers = false; //primera pantalla sin respuestas
		$scope.validate = function(){
			$http.get('/validservice/' + $scope.user.ci).then(function(response){ //envio la cedula del usuario al servicio de validacion de usuario
				console.log(response.data.status);
				if (!response.data.status){ //si es falso el usuario no esta registrado
					$scope.showRegister = true; // muestro el registro
					$(".form-login").hide(); //escondo el login
					var data = $.param({ // guardo la data del usuario que ingresa en el formulario
		            	name: $scope.user.first_name,
		            	lastName: $scope.user.last_name,
		            	ci: $scope.user.ci,
		            	email: $scope.user.mail,
		            	phone: $scope.user.phone
		           	});
					$http.post('/register', data).then(function(response){ //envio los datos del usuario al servicio que lo registra y me devuelve el id y las respuestas vacias 
						console.log(response);
					});
				}else{ // si es verdadero el usuario esta registrado
					$(".form-login").hide(); //se esconde el login
					registerFunction();
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
            	lastName: $scope.user.last_name,
            	ci: $scope.user.ci,
            	email: $scope.user.mail,
            	phone: $scope.user.phone
           	});
			$http.post('/answers', data).then(function(response){
				console.log(data);
				$scope.showAnswers = true;
				console.log(response);
				$scope.user.a1 = response.data.answers.a1;
			});
		}
	})


;