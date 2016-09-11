angular
	.module("myApp", [])

	.controller("RegisterCtrl", function ($scope) {
		$scope.registerf = function(){
			console.log($scope.user);
		}
	})
;