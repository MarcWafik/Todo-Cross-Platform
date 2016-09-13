"use strict";

app.factory('User', function (Entity, ToDo) {
    var User = augment(Entity, function (parent) {

        this.constructor = function () {
            parent.constructor.call(this);
            this.username = "";
            this.pw = "";
            this.arrToDo = [];
        };
        /**
         * used like a copy constructor to copy the json object
         * @param myuser {User} the user to be copied to the current one
         */
        this.copy = function (myuser) {
            parent.copy.call(this,myuser);
            this.username = myuser.username;
            this.pw = myuser.pw;

            this.arrToDo = [];
            for (var y in myuser.arrToDo) {
                var x = new ToDo();
                x.copy(myuser.arrToDo[y]);
                this.arrToDo.push(x);
            }
        };

        /**
         * Save the current user data in local storage creating a new one
         * @return {bollean} true for saved correctly
         */
        this.save = function () {
            if (localStorage.getItem(this.username) == null) {
                this.update();
                return true;
            }
            return false;
        };

        /**
         * update the current user data in local storage
         */
        this.update = function () {
            localStorage.setItem(this.username, JSON.stringify(this));
        };

        /**
         * read the data of the user with the following username 
         * @param {String} username of the user to be loaded from the local storage
         */
        this.read = function (username) {
            var myuser = JSON.parse(localStorage.getItem(username));
            this.copy(myuser);
        };

        /**
         * delete the current user from the localstorage
         */
        this.delete = function () {
            localStorage.removeItem(this.username);
            this.logout();
        };
        /**
         * uses the id and pw in the current object
         * @return {boolean} true for login succsesfull false for wrong id or pw
         */
        this.login = function () {
            var myuser = JSON.parse(localStorage.getItem(this.username));

            if (myuser !== null && myuser.pw === this.pw) {
                this.copy(myuser);
                User._IsLogedin = true;
                return true;
            }
            User._IsLogedin = false;
            return false;
        };
        /**
         * clear the current user instance and doing a final save and logout
         */
        this.logout = function () {
            this.update();
            User._Instance = null;
            User._IsLogedin = false;
        };
    });

    User._Instance = null;
    User._IsLogedin = false;
    /**
     * 
     * @returns {User|User._Instance} an instance for the singleton pattern
     */
    User.GetInstance = function () {
        if (User._Instance === null) {
            User._Instance = new User();
            User._IsLogedin = false;
        }
        return User._Instance;
    };
    return User;
});