"use strict";

var UserView = {
	Login: function (email, pw, result) {

		if (UserController.Login(email.value, pw.value)) {
			window.location = "index.html";
		} else {
			result.innerHTML = "the email and pw do not match";
		}
	},
	CheckLogin: function () {
		var path = window.location.pathname;
		var page = path.split("/").pop();

		if (!UserController.CheckLogin()) {
			if (page != "signup.html" || page != "signin.html")
				window.location = "login.html";
			return false;
		} else if (page != "index.html") {
			window.location = "index.html";
		}
		User.GetInstance().getLoginFromSession();
		return true;
	},
	SignUp: function (email, pw, result) {
		if (UserController.Signup(email.value, pw.value)) {
			result.innerHTML = "email created succsesfuly";
		} else {
			result.innerHTML = "the email is taken";
		}
	}
};