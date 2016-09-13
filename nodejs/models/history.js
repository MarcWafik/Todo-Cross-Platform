
var DataBase = require('./database');

var History = function () {};

/**
 * create a new history and insert it to DB
 * @param {History} history
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
History.Create = function (history, callback) {
	DataBase.getInstance().query("INSERT INTO history	(action, userID, todoID) VALUES (?,?,?)",
			[history.action, history.userID, history.todoID], callback);
};

/**
 * query the history from DB
 * @param {int} id the id of todo
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
History.Read = function (id, callback) {
	DataBase.getInstance().query("SELECT * FROM history WHERE id=?", [id], callback);
};

/**
 * query all history from DB depending on user id
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
History.ReadAll = function (callback) {
	DataBase.getInstance().query("SELECT * FROM history", [], callback);
};

module.exports = History;