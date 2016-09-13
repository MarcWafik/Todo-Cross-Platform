"use strict";

app.controller("SignInController", function ($cordovaVibration, $state, $cordovaDialogs, $scope, User) {
	$scope.myUser = User.GetInstance();

	if (User._IsLogedin) {
		$state.go('todo');
	}
	/**
	 * redirect if signin succses or alerts if signin fails
	 */
	$scope.Login = function () {
		$scope.myUser.login(function (result) {
			if (result) {
				$state.go('todo');
			} else {
				$cordovaDialogs.alert("the email and pw do not match", "", "close");
			}
		})
	};
});