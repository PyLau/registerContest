 angular
 .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngAnimate'])

 .config(function($mdThemingProvider) {
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
})

    .controller('BasicDemoCtrl', BasicDemoCtrl)

function BasicDemoCtrl($mdPanel, $scope, $http, $timeout) {
  this._mdPanel = $mdPanel;
  $scope.isLoading = false;
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

    $scope.showLogin = true;
    $scope.showRegister = false;
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
              // $scope.isLoading = true;
              $scope.showLogin = false; //escondo el login
              if (!data.status){ //si es falso el usuario no esta registrado
                $timeout(function() {
                  $scope.showRegister = true;
                }, 500);
             }else{ // si es verdadero el usuario esta registrado
                // $scope.isLoading = false;
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
      $scope.showRegister = false; //se esconde el registro
      // $scope.showAnswers = true; 
      var data = {"name":$scope.user.name,
                  "lastName":$scope.user.lastname,
                  "cedula": $scope.user.ci,
                  "email":$scope.user.mail,
                  "phone":$scope.user.phone,
                  "address": $scope.state
               };
      console.log(data); //a continuacion se llama al servicio que registra
      $http.post('http://widget.eluniversal.com/ContestAdmin/services/questions/user/register/281/', data, {headers : { 
        'Content-Type': 'application/json;charset=utf-8;'
      }}) //envio la dara completa del usuario al servicio y me devuelve los mismos datos mas el id
            .success(function (data) {
               console.log(data);
               var userid = data.user.id;
               console.log(userid);
               $scope.answers = data.answers;
      });
   };


}
BasicDemoCtrl.prototype.showDialog = function() {
  var position = this._mdPanel.newPanelPosition()
      .absolute()
      .center();

  var config = {
    attachTo: angular.element(document.body),
    controller: BasicDemoCtrl,
    controllerAs: 'ctrl',
    disableParentScroll: this.disableParentScroll,
    templateUrl: 'panel.tmpl.html',
    hasBackdrop: true,
    panelClass: 'demo-dialog-example',
    position: position,
    trapFocus: true,
    zIndex: 150,
    clickOutsideToClose: true,
    escapeToClose: true,
    focusOnOpen: true
  };

  this._mdPanel.open(config);
};


function PanelDialogCtrl(mdPanelRef) {
  this._mdPanelRef = mdPanelRef;
}


PanelDialogCtrl.prototype.closeDialog = function() {
  var panelRef = this._mdPanelRef;

  panelRef && panelRef.close().then(function() {
    angular.element(document.querySelector('.demo-dialog-open-button')).focus();
    panelRef.destroy();
  });
};





 // .run(function($httpBackend){

 //    var validTrue = {"status":false, "user":{"id":41, "name":"Wiljac", "lastName":"Aular", "cedula":"19960100", "email":"waular@eluniversal.com", "phone":"04129350470"}, "answers":[{"pubDate":"13/09/2016", "answer":"Respuesta 1", "position":"1", "status":true }, {"pubDate":"14/09/2016", "answer":"Respuesta 2", "position":"2", "status":true },{"pubDate":"15/09/2016", "position":"3", "status":false },{"pubDate":"16/09/2016", "position":"4", "status":false }, {"pubDate":"17/09/2016", "position":"5", "status":false },{"pubDate":"18/09/2016", "position":"6", "status":false },{"pubDate":"19/09/2016", "position":"7", "status":false }, {"pubDate":"20/09/2016", "position":"8", "status":false },{"pubDate":"21/09/2016", "position":"9", "status":false },{"pubDate":"22/09/2016", "position":"10", "status":false } ] };

 //    $httpBackend.whenGET('/validservice').respond(function(method, url, data) {
 //     return [200, validTrue, {}];
 //  });
 // })

//  .controller('DemoCtrl', function($scope, $http, $timeout, $mdPanel) {
//     // var slide = false;
//     $scope.isLoading = false;
//     $scope.states = [
//     "Amazonas",
//     "Anzoátegui",
//     "Apure",
//     "Aragua",
//     "Barinas",
//     "Bolívar",
//     "Carabobo",
//     "Cojedes",
//     "Distrito Capital",
//     "Delta Amacuro",
//     "Falcón",
//     "Guárico",
//     "Lara",
//     "Mérida",
//     "Miranda",
//     "Monagas",
//     "Nueva Esparta",
//     "Portuguesa",
//     "Sucre",
//     "Táchira",
//     "Trujillo",
//     "Vargas",
//     "Yaracuy",
//     "Zulia"
//     ];

//   $scope.showLogin = true;
//   $scope.showRegister = false;
//   $scope.validate = function(){ // (1) Funcion para validar cedula del usuario
//       $scope.isLoading = true;
//       //se llama al servicio que responde false si no esta registrado y responde true mas los datos del usuario si esta registrado
//       $http.get('http://widget.eluniversal.com/ContestAdmin/services/questions/user/281/' + $scope.user.ci, {
//         headers : { 
//           'Content-Type': 'application/json;charset=utf-8;'
//         }}
//       )
//       .success(function (data) {
//             console.log(data.status);
//             // $scope.isLoading = true;
//             $scope.showLogin = false; //escondo el login
//             if (!data.status){ //si es falso el usuario no esta registrado
//               $timeout(function() {
//                 $scope.showRegister = true;
//               }, 500);
//            }else{ // si es verdadero el usuario esta registrado
//               // $scope.isLoading = false;
//              // $scope.showAnswers = true;
//              // console.log(data.answers);
//              // $scope.answersResp = data.answers;
//           }
//       })
//      .finally(function () {
//         // Hide loading whether our call succeeded or failed.
//         $scope.isLoading = false;
//       });
//    };
//    $scope.register = function(){
//       $scope.showRegister = false; //se esconde el registro
//       // $scope.showAnswers = true; 
//       var data = {"name":$scope.user.name,
//                   "lastName":$scope.user.lastname,
//                   "cedula": $scope.user.ci,
//                   "email":$scope.user.mail,
//                   "phone":$scope.user.phone,
//                   "address": $scope.state
//                };
//       console.log(data); //a continuacion se llama al servicio que registra
//       $http.post('http://widget.eluniversal.com/ContestAdmin/services/questions/user/register/281/', data, {headers : { 
//         'Content-Type': 'application/json;charset=utf-8;'
//       }}) //envio la dara completa del usuario al servicio y me devuelve los mismos datos mas el id
//             .success(function (data) {
//                console.log(data);
//                var userid = data.user.id;
//                console.log(userid);
//                $scope.answers = data.answers;
//       });
//    };

// })



//  .config(function($mdThemingProvider) {
//   // Configure a dark theme with primary foreground yellow
//   $mdThemingProvider.theme('default')
//   .primaryPalette('blue')
// });

