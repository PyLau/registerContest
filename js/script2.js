 angular
 .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
 .controller('DemoCtrl', function($scope, $http) {
  $scope.isLoading = false;
  $scope.showLogin = true;
  $scope.validate = function(){
   $scope.isLoading = true;
   $http.get('http://10.3.0.186:8080/ContestAdmin/services/questions/user/81/' + $scope.user.ci)
   .success(function (data) {
     console.log(data.status);
     $scope.showLogin = false;
        //         if (!data.status){ //si es falso el usuario no esta registrado
        //           $scope.isLoading = false;
        //           // $scope.showRegister = true; // muestro el registro
        //         }else{ // si es verdadero el usuario esta registrado
        //           $scope.isLoading = false;
        //           //se esconde el login
        //           // $scope.showAnswers = true;
        //           // console.log(data.answers);
        //           // $scope.answersResp = data.answers;
        //       }
      })
   .finally(function () {
      // Hide loading whether our call succeeded or failed.
      $scope.isLoading = false;
    });
 };
})

 .config(function($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('red')
            .dark();
          });