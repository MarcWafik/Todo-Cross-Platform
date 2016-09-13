"use strict";

var UserController = {
	CheckLogin: function () {
		return User.GetInstance().getLoginFromSession();
	},
	/**
	 * @param {string} username
	 * @param {string} pw Password
	 * @return {boolean} return true if login succsesfull
	 */
	Login: function (username, pw) {
		return	User.GetInstance().login(username, pw);
	},
	/**
	 * creat a user and save it to the storage
	 * @param {string} username
	 * @param {string} pw Password
	 * @return {boolean} return true if signup succsesfull
	 */
	Signup: function (username, pw) {
		var temp = User.GetInstance();
		temp.username = username;
		temp.pw = pw;
		return temp.save();
	},
	/**
	 * update a user and save
	 * @param {string} username
	 * @param {string} pw Password
	 */
	Update: function (username, pw) {
		var temp = User.GetInstance();
		temp.username = username;
		temp.pw = pw;
		temp.update();
	},
	/**
	 * delete the current user and all hi data
	 */
	Delete: function () {
		User.GetInstance().delete;
	}
};