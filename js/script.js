 angular
 .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngAnimate'])
 // .run(function($httpBackend){

 //    var validTrue = {"status":false, "user":{"id":41, "name":"Wiljac", "lastName":"Aular", "cedula":"19960100", "email":"waular@eluniversal.com", "phone":"04129350470"}, "answers":[{"pubDate":"13/09/2016", "answer":"Respuesta 1", "position":"1", "status":true }, {"pubDate":"14/09/2016", "answer":"Respuesta 2", "position":"2", "status":true },{"pubDate":"15/09/2016", "position":"3", "status":false },{"pubDate":"16/09/2016", "position":"4", "status":false }, {"pubDate":"17/09/2016", "position":"5", "status":false },{"pubDate":"18/09/2016", "position":"6", "status":false },{"pubDate":"19/09/2016", "position":"7", "status":false }, {"pubDate":"20/09/2016", "position":"8", "status":false },{"pubDate":"21/09/2016", "position":"9", "status":false },{"pubDate":"22/09/2016", "position":"10", "status":false } ] };

 //    $httpBackend.whenGET('/validservice').respond(function(method, url, data) {
 //     return [200, validTrue, {}];
 //  });
 // })

 .controller('DemoCtrl', function($scope, $http, $timeout, $mdPanel) {
    $scope.slide = true;
    $scope.isLoading = false;
    $scope.showLogin = true;
    $scope.showRegister = false;
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
    $scope.dates = [
      "14/10/2016",
      "15/10/2016",
      "16/10/2016",
      "17/10/2016",
      "18/10/2016",
      "19/10/2016"
    ];
    $scope.answers = [];
  $scope.hidebases = function() {
    $scope.slide = false;
  }
  $scope.validate = function(){ // (1) Funcion para validar cedula del usuario
      $scope.isLoading = true;
      //se llama al servicio que responde false si no esta registrado y responde true mas los datos del usuario si esta registrado
      $http.get('http://widget.eluniversal.com/ContestAdmin/services/questions/user/281/' + $scope.user.ci, {
        headers : { 
          'Content-Type': 'application/json;charset=utf-8;'
        }}
      )
      .success(function (data) {
            console.log(data.status);
            $scope.showLogin = false; //escondo el login
            if (!data.status){ //si es falso el usuario no esta registrado
              $timeout(function() {
                $scope.showRegister = true;
              }, 500);
           }else{ 
              angular.forEach(data.user, function(value, key) {
                console.log(value);


              }, log);
            // si es verdadero el usuario esta registrado
            //se muestra el formulario de respuestas
            //si el usuario tiene respuestas cargadas se muestran
            //

             // $scope.showAnswers = true;
             // console.log(data.answers);
             // $scope.answersResp = data.answers;
          }
      })
     .finally(function () {
        // Hide loading whether our call succeeded or failed.
        $scope.isLoading = false;
      });
   };
   $scope.register = function(){
      $scope.isLoading = true;
      $scope.showRegister = false; //se esconde el registro
      var data = {"name":$scope.user.name,
                  "lastName":$scope.user.lastname,
                  "cedula": $scope.user.ci,
                  "email":$scope.user.mail,
                  "phone":$scope.user.phone,
                  "address": $scope.state
               };
      console.log(data); //a continuacion se llama al servicio que registra
      $http.post('http://widget.eluniversal.com/ContestAdmin/services/questions/user/register/281/', data, {
        headers : { 
          'Content-Type': 'application/json;charset=utf-8;'
        }}
      ) //envio la dara completa del usuario al servicio y me devuelve los mismos datos mas el id
        .success(function (data) {
          console.log(data);
          var userid = data.user.id;
          console.log(userid);
          // $scope.answers = data.answers;
          $scope.showAnswers = true; 
      })
      .finally(function () {
        // Hide loading whether our call succeeded or failed.
        $scope.isLoading = false;
      });
   };

    $scope.sendAnswers = function(){
      //lamada al servicio que guardara la participacion

      $scope.answers.push($scope.user.answer);
      console.log($scope.answers);
    };
})



 .config(function($mdThemingProvider) {
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
});

