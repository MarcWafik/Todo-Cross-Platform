"use strict";

app.controller("SignUpController", function ( $state, $cordovaDialogs, $cordovaVibration, $scope, User) {
    $scope.myUser = User.GetInstance();
    if (User._IsLogedin) {
        $state.go('todo');
    }

    /**
     * creat a user and save it to the storage
     * @return {boolean} return true if signup succsesfull
     */
    $scope.Signup = function () {

        if ($scope.myUser.save()) {
            $scope.myUser.login();
            $state.go('todo');
        } else {
            $cordovaDialogs.alert("the email is taken", "", "close");
        }
    };

});