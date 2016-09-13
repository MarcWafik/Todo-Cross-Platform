"use strict";

app.controller("SignInController", function ($cordovaVibration, $state, $cordovaDialogs, $scope, User) {
    $scope.myUser = User.GetInstance();

    if (User._IsLogedin) {
        $state.go('todo');
    }

    /**
     * @return {boolean} return true if login succsesfull
     */
    $scope.Login = function () {
        if ($scope.myUser.login()) {
            $state.go('todo');
        } else {
            $cordovaDialogs.alert("the email and pw do not match", "", "close");
        }
    };
});