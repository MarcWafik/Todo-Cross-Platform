"use strict";

app.factory('User', function (Entity, $http) {
	var User = augment(Entity, function (parent) {
		this.constructor = function () {
			parent.constructor.call(this);

			this.name = "";
			this.email = "";
			this.password = "";
		};
		/**
		 * used like a copy constructor to copy the json object
		 * @param {User} myuser the user to be copied to the current one
		 */
		this.copy = function (myuser) {
			parent.copy.call(this, myuser);

			this.name = myuser.name;
			this.email = myuser.email;
			this.password = myuser.password;
		};

		/**
		 * uses the email and password in object and send a request to login
		 * @param {function} callback a function to be called on responce succses or failure and pass a boolean true on succses false on failure
		 */
		this.login = function (callback) {
			var self = this;
			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
			$http.post(RESTURL + "user/login/", JSON.stringify(self))
					.then(function (response) {
					    if (response.data.status == true) {
							self.copy(response.data.data);
							User._IsLogedin = true;
						} else {
							User._IsLogedin = false;
						}
						callback(User._IsLogedin);
					});
		};

		/**
		 * uses the data in object and send a request to signup
		 * @param {function} callback a function to be called on responce succses or failure and pass a boolean true on succses false on failure
		 */
		this.signup = function (callback) {
		    this.timeCreated = new Date();
		    this.timeUpdated = new Date();
			var self = this;
			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
			$http.post(RESTURL + "user/create/", JSON.stringify(self))
					.then(function (response) {
					    if (response.data.status == true) {
					        self.id=response.data.data.insertId;
							User._IsLogedin = true;
						} else {
							User._IsLogedin = false;
						}
						callback(User._IsLogedin);
					});
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