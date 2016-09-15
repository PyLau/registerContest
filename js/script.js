angular
	.module("myApp", ['ngMockE2E','ngAnimate'])

	.run(function($httpBackend){

		var validTrue = {"status":true, "user":{"id":41, "name":"Wiljac", "lastName":"Aular", "cedula":"19960100", "email":"waular@eluniversal.com", "phone":"04129350470"}, "answers":[{"pubDate":"13/09/2016", "answer":"Respuesta 1", "position":"1", "status":true }, {"pubDate":"14/09/2016", "answer":"Respuesta 2", "position":"2", "status":true },{"pubDate":"15/09/2016", "position":"3", "status":false },{"pubDate":"16/09/2016", "position":"4", "status":false }, {"pubDate":"17/09/2016", "position":"5", "status":false },{"pubDate":"18/09/2016", "position":"6", "status":false },{"pubDate":"19/09/2016", "position":"7", "status":false }, {"pubDate":"20/09/2016", "position":"8", "status":false },{"pubDate":"21/09/2016", "position":"9", "status":false },{"pubDate":"22/09/2016", "position":"10", "status":false } ] };

		$httpBackend.whenGET(new RegExp('\\/validservice\\/[0-9]+')).respond(function(method, url, data) {
			return [200, validTrue, {}];
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
					// $(".form-login").hide(); //escondo el login
					// var data = $.param({ // guardo la data del usuario que ingresa en el formulario
		   //          	name: $scope.user.first_name,
		   //          	lastName: $scope.user.last_name,
		   //          	ci: $scope.user.ci,
		   //          	email: $scope.user.mail,
		   //          	phone: $scope.user.phone
		   //         	});
					// $http.post('/register', data).then(function(response){ //envio los datos del usuario al servicio que lo registra y me devuelve el id y las respuestas vacias 
					// 	console.log(response);
					// });
				}else{ // si es verdadero el usuario esta registrado
					$(".form-login").hide(); //se esconde el login
					console.log(response.data.answers);
					$scope.showAnswers = true;
					$scope.answers = response.data.answers;
				}
			});
		};
		// $scope.registerf = function(){

		// }
		// $scope.sendAnswers = function(){

		// }


	})


;