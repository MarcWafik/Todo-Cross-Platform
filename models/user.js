"use strict";

function User() {
	this.username = "";
	this.pw = "";
	this.arrToDo = [];

	/**
	 * used like a copy constructor to copy the json object
	 * @param myuser {User} the user to be copied to the current one
	 */
	this.copy = function (myuser) {
		this.username = myuser.username;
		this.pw = myuser.pw;

		this.arrToDo = myuser.arrToDo;
		/*
		 this.arrToDo = [];
		 for (var i = 0; i < myuser.arrToDo.length; i++) {
		 var x = new ToDo();
		 this.arrToDo.push(x);
		 }*/
	};
	/**
	 * Save the current user data in local storage creating a new one
	 * @return {bollean} true for saved correctly
	 */
	this.save = function () {
		var DoesExists = localStorage.getItem(this.username);

		if (DoesExists === null) {
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
		sessionStorage.user = JSON.stringify(this);
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

	this.login = function (username, pw) {
		var myuser = JSON.parse(localStorage.getItem(username));

		if (myuser !== null && myuser.pw === pw) {
			this.copy(myuser);
			sessionStorage.user = JSON.stringify(this);
			return true;
		}
		return false;
	};
	this.getLoginFromSession = function () {

		if (sessionStorage.user) {
			this.copy(JSON.parse(sessionStorage.user));
			return true;
		}
		return false;
	};
	this.logout = function () {
		if (sessionStorage.user) {
			delete sessionStorage.user;
			return true;
		}
		return false;
	};
	/**
	 * loop throw the todo array and triger the todo timer
	 */
	this.AlertToDo = function () {
		for (var i = 0; i < this.arrToDo.length; i++) {
			//	this.arrToDo[i].TimeRemaining();

			//<<<<==========  Start	
			if (typeof this.arrToDo[i].dueDate != 'object') {
				this.arrToDo[i].dueDate = new Date(this.arrToDo[i].dueDate);
			}

			if (this.arrToDo[i].dueDate != null && this.arrToDo[i].dueDate != 'undefined') {
				var currentDate = new Date();
				var result = currentDate.getMilliseconds() - this.arrToDo[i].dueDate.getMilliseconds();
				//	setTimeout(this.eventDueDateOver.notify(), result);
				if (result <= 0) {
					alert("todo timeout");
				} else {
					setTimeout(function () {
						alert("todo timeout");
					}, result);
				}
			}
			//<<<<==========  end	
		}
	};
}

User._Instance = null;
/**
 * 
 * @returns {User|User._Instance} an instance for the singleton pattern
 */
User.GetInstance = function () {
	if (User._Instance === null) {
		User._Instance = new User();
	}
	return User._Instance;
};