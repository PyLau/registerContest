var myApp = angular.module("myApp", []);

myApp.controller("RegisterCtrl", function ($scope) {
	$scope.registerf = function(){
		console.log('click boton'); 
	}
});