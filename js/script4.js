 angular
 .module('MyApp',['ngMockE2E','ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngAnimate'])
 .run(function($httpBackend){

    var validTrue = {"status":false, "user":{"id":41, "name":"Wiljac", "lastName":"Aular", "cedula":"19960100", "email":"waular@eluniversal.com", "phone":"04129350470"}, "answers":[{"pubDate":"13/09/2016", "answer":"Respuesta 1", "position":"1", "status":true }, {"pubDate":"14/09/2016", "answer":"Respuesta 2", "position":"2", "status":true },{"pubDate":"15/09/2016", "position":"3", "status":false },{"pubDate":"16/09/2016", "position":"4", "status":false }, {"pubDate":"17/09/2016", "position":"5", "status":false },{"pubDate":"18/09/2016", "position":"6", "status":false },{"pubDate":"19/09/2016", "position":"7", "status":false }, {"pubDate":"20/09/2016", "position":"8", "status":false },{"pubDate":"21/09/2016", "position":"9", "status":false },{"pubDate":"22/09/2016", "position":"10", "status":false } ] };

    $httpBackend.whenGET('/validservice').respond(function(method, url, data) {
     return [200, validTrue, {}];
  });
 })
 .controller('DemoCtrl', function($scope, $http, $timeout) {
    $scope.states = [
    "Amazonas",
    "Anzoátegui",
    "Apure",
    "Aragua",
    "Barinas",
    "Bolívar",
    "Carabobo",
    "Cojedes",
    "Distrito Capital",
    "Delta Amacuro",
    "Falcón",
    "Guárico",
    "Lara",
    "Mérida",
    "Miranda",
    "Monagas",
    "Nueva Esparta",
    "Portuguesa",
    "Sucre",
    "Táchira",
    "Trujillo",
    "Vargas",
    "Yaracuy",
    "Zulia"
    ];
  $scope.isLoading = true;
  $scope.showLogin = true;
  $scope.showRegister = false;
  $scope.validate = function(){
      $http.get('/validservice') //envio la cedula del usuario al servicio de validacion de usuario
      .success(function (data) {
       console.log(data.status);
            // $scope.isLoading = true;
            $scope.showLogin = false;
            if (!data.status){ //si es falso el usuario no esta registrado
              // $scope.isLoading = false;//escondo el login
              $timeout(function() {
               $scope.showRegister = true;
            }, 500);
           }else{ // si es verdadero el usuario esta registrado
              // $scope.isLoading = false;
             // $scope.showAnswers = true;
             // console.log(data.answers);
             // $scope.answersResp = data.answers;
          }
       });
   };
   $scope.register = function(){
      $scope.showRegister = false; //se esconde el registro
      // $scope.showAnswers = true; 
      var data = {"name":$scope.user.name,
                  "lastName":$scope.user.lastname,
                  "cedula": $scope.user.ci,
                  "email":$scope.user.mail,
                  "phone":$scope.user.phone,
                  "address": $scope.state
               };
      console.log(data);

         // var config = {
         //        headers : {
         //            'Content-Type': 'application/json;charset=utf-8;'
         //        }
         //    }
          // $http.post('http://10.3.0.186:8080/ContestAdmin/services/questions/user/register/81', data, config ).then(function(response){ //envio los datos del usuario al servicio que lo registra y me devuelve el id y las respuestas vacias 
            // console.log(response);
            // $scope.answersResp = response.data.answers;
         // });
      }
   })



 .config(function($mdThemingProvider) {
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
});