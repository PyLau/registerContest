angular
	.module("myApp", ['ngAnimate'])
	.controller("RegisterCtrl", function ($scope, $http) {
		$scope.showLogin = true;
		$scope.showRegister = false; //primera pantalla sin registro
		$scope.showAnswers = false; //primera pantalla sin respuestas
		$scope.validate = function(){
			$http.get('http://10.3.0.186:8080/ContestAdmin/services/questions/user/81/' + $scope.user.ci) //envio la cedula del usuario al servicio de validacion de usuario
	         .success(function (data) {
	            console.log(data.status);
	            $scope.isLoading = true;
	            $scope.showLogin = false;
	            if (!data.status){ //si es falso el usuario no esta registrado
	              $scope.isLoading = false;
	              // $scope.showRegister = true; // muestro el registro
	            }else{ // si es verdadero el usuario esta registrado
	            	 $scope.isLoading = false;
	               //se esconde el login
	              // $scope.showAnswers = true;
	              // console.log(data.answers);
	              // $scope.answersResp = data.answers;
	            }
	          });
		};
		$scope.registerf = function(){
			$scope.showRegister = false; //se esconde el registro
			$scope.showAnswers = true; 
			var data = {"name":$scope.user.first_name,"lastName":$scope.user.last_name,"cedula": $scope.user.ci,"email":$scope.user.mail,"phone":$scope.user.phone,"address": $scope.user.address};
			console.log(data);
			var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }
			 $http.post('http://10.3.0.186:8080/ContestAdmin/services/questions/user/register/81', data, config ).then(function(response){ //envio los datos del usuario al servicio que lo registra y me devuelve el id y las respuestas vacias 
			 	console.log(response);
			 	// $scope.answersResp = response.data.answers;
			 });
			}
				 $scope.sendAnswers = function(){
		 	// $http.post('/answers', $scope.answersResp).then(function(response){ //envio los datos del usuario al servicio que lo registra y me devuelve el id y las respuestas vacias 
		 	// 	console.log(response);
		 	// });
		 }
	})


;