
var DataBase = require('./database');

var User = function () {};

/**
 * check if email is alreay existing
 * create a new user and insert it to DB
 * @param {User} user
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
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

/**
 * check if email and password is correct
 * return a query of the user if email & password os correct
 * @param {User} user
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
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