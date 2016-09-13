
var DataBase = require('./database');

var Todo = function () {};

/**
 * create a new todo and insert it to DB
 * @param {Todo} Todo
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
Todo.Create = function (Todo, callback) {
	DataBase.getInstance().query("INSERT INTO todos	(text, description, dueDate, isChecked, userID) VALUES (?,?,?,?,?)",
			[Todo.text, Todo.description, Todo.dueDate, Todo.isChecked, Todo.userID], callback);
};

/**
 * query the todo from DB
 * @param {int} id the id of todo
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
Todo.Read = function (id, callback) {
	DataBase.getInstance().query("SELECT * FROM todos WHERE id=?", [id], callback);
};

/**
 * query multiple todo from DB depending on user id
 * @param {int} userID
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
Todo.ReadAll = function (userID, callback) {
	DataBase.getInstance().query("SELECT * FROM todos WHERE userID=?", [userID], callback);
};

/**
 * update an already esisting todo
 * @param {Todo} Todo
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
Todo.Update = function (Todo, callback) {
	DataBase.getInstance().query("UPDATE todos SET text = ?, description = ?, dueDate = ?,isChecked = ?, userID = ? WHERE id=?",
			[Todo.text, Todo.description, Todo.dueDate, Todo.isChecked, Todo.userID, Todo.id], callback);
};

/**
 * remove todo from database
 * @param {int} id the id of todo
 * @param {function} callback function that has (err, rows, fields) as param called after DB query is done
 */
Todo.Delete = function (id, callback) {
	DataBase.getInstance().query("DELETE FROM todos WHERE id=?", [id], callback);
};

module.exports = Todo;