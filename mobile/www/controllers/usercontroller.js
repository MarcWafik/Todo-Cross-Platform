"use strict";

app.controller("UserController", function ($location, $scope, currentUser) {
    $scope.myUser = currentUser;
    if (User._IsLogedin) {
        $location.path('/todo');
    }
    /**
     * @return {boolean} return true if login succsesfull
     */
    $scope.Login = function () {
        navigator.vibrate(250);

        if (currentUser.login()) {
            $location.path('/todo');
        } else {
            navigator.notification.alert("the email and pw do not match", function () { }, "", "close");
        }
    };

    /**
     * creat a user and save it to the storage
     * @return {boolean} return true if signup succsesfull
     */
    $scope.Signup = function () {
        navigator.vibrate(250);
        if (currentUser.save()) {
            currentUser.login();
            $location.path('/todo');
        } else {
            result.innerHTML = "the email is taken";
        }
    };

    /**
     * update a user and save
     */
    $scope.Update = function () {
        return currentUser.update();
    };

    /**
     * delete the current user and all hi data
     */
    $scope.Delete = function () {
        currentUser.delete();
    };

});