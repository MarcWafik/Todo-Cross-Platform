"use strict";

app.controller("SignUpController", function ($state, $cordovaDialogs, $cordovaVibration, $scope, User) {
	$scope.myUser = User.GetInstance();

	if (User._IsLogedin) {
		$state.go('todo');
	}
	/**
	 * redirect if signup succses or alerts if signup fails
	 */
	$scope.Signup = function () {
		$scope.myUser.signup(function (result) {
			if (result) {
				$state.go('todo');
			} else {
				$cordovaDialogs.alert("the email is taken", "", "close");
			}
		})
	};
});