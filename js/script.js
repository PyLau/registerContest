var myApp = angular.module("myApp", []);

myApp.controller("RegisterCtrl", function ($scope) {
	$scope.register = function(){
		console.log('click boton'); 
	}
});