
var DataBase = require('./database');

var User = function () {};

User.SignUp = function (user, callback) {
	DataBase.getInstance().query("SELECT * FROM users WHERE email=?", [user.email], function (err, rows, fields) {

		if (!err && rows.length !== 0) {
			err = "custom error: email already taken";
		}
		if (err) {
			callback(err, rows, fields);
			return;
		}
		DataBase.getInstance().query("INSERT INTO users	(email, password, name) VALUES (?,?,?)",
				[user.email, user.password, user.name], callback);
	});
};

User.SignIn = function (user, callback) {
	DataBase.getInstance().query("SELECT * FROM users WHERE email=? AND password=?", [user.email, user.password], function (err, rows, fields) {
		if (!err && rows.length !== 1) {
			err = "custom error: User does not exists";
			rows = [];
		} else {
			rows = rows[0];
		}
		callback(err, rows, fields);
	});
};


module.exports = User;