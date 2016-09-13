"use strict";

app.controller("UserController", ['$location', function ($location) {

    this.currentUser = User.GetInstance();


    if (User._IsLogedin) {
        $location.path('/todo');
    }
    /**
     * @return {boolean} return true if login succsesfull
     */
    this.Login = function () {
        if (this.currentUser.login()) {
            $location.path('/todo');
        } else {
            result.innerHTML = "the email and pw do not match";
        }
    };

    /**
     * creat a user and save it to the storage
     * @return {boolean} return true if signup succsesfull
     */
    this.Signup = function () {
        if (this.currentUser.save()) {
            $location.path('/todo');
        } else {
            result.innerHTML = "the email is taken";
        }
    };

    /**
     * update a user and save
     */
    this.Update = function () {
        return this.currentUser.update();
    };

    /**
     * delete the current user and all hi data
     */
    this.Delete = function () {
        this.currentUser.delete();
    };

}]);