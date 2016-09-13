
var DataBase = require('./database');

var Todo = function () {};

Todo.Create = function (Todo, callback) {
	DataBase.getInstance().query("INSERT INTO todos	(text, description, dueDate, isChecked, userID) VALUES (?,?,?,?,?)",
			[Todo.text, Todo.description, Todo.dueDate, Todo.isChecked, Todo.userID], callback);
};

Todo.Read = function (id, callback) {
	DataBase.getInstance().query("SELECT * FROM todos WHERE id=?", [id], callback);
};

Todo.ReadAll = function (userID, callback) {
	DataBase.getInstance().query("SELECT * FROM todos WHERE userID=?", [userID], callback);
};

Todo.Update = function (Todo, callback) {
	DataBase.getInstance().query("UPDATE todos SET text = :text, description = ?, dueDate = ?,isChecked = ?, userID = ? WHERE id=?",
			[Todo.text, Todo.description, Todo.dueDate, Todo.isChecked, Todo.userID, Todo.id], callback);
};

Todo.Delete = function (id, callback) {
	DataBase.getInstance().query("DELETE FROM todos WHERE id=?", [id], callback);
};

module.exports = Todo;