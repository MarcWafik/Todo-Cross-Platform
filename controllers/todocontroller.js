"use strict";

var ToDoController = {
	/**
	 * add a new to do item to databas
	 * @param {String} text the title of the todo
	 * @param {String} notes description of the todo
	 * @param {Date} dueDate description
	 * @return {Todo} the todo created
	 */
	Add: function (text, notes, dueDate) {
		var x = new ToDo();
		x.dueDate = dueDate;
		x.text = text;
		x.notes = notes;
		User.GetInstance().arrToDo.push(x);
		User.GetInstance().update();
		return x;
	},
	/**
	 * add a new to do item to databas
	 * @param {int} ToDoinex the index to be deleted from the array
	 */
	Delete: function (ToDoindex) {
		User.GetInstance().arrToDo.splice(ToDoindex, 1);
		return User.GetInstance().update();
	},
	/**
	 * add a new to do item to databas
	 * @param {int} ToDoinex the index to be Modified from the array
	 * @param {boolean} isChecked true for marked false for unmarked 
	 */
	Check: function (ToDoindex, isChecked) {
		User.GetInstance().arrToDo[ToDoindex].isChecked = Boolean(isChecked);
		return User.GetInstance().update();
	},
	/**
	 * List all to do items
	 */
	List: function () {
		//console.table(User.GetInstance().arrToDo);
		return User.GetInstance().arrToDo;
	},
	Alert: function () {
		User.GetInstance().AlertToDo();
	}
};