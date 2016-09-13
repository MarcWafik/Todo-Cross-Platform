"use strict";
var ToDo = augment(Parent, function (parent) {

	this.constructor = function () {
		this.dueDate = 0;
		this.text = "";
		this.notes = "";
		this.isChecked = false;
		//this.event_DueDateOver = new Event(this);
		//this.event_ToDoModified = new Event(this);
	};
	/**
	 * used like a copy constructor to copy the json object
	 * @param toDo {ToDo} the user to be copied to the current one
	 */
	this.copy = function (toDO) {
		this.creatDate = new Date(toDO.creatDate);
		this.dueDate = new Date(toDO.dueDate);
		this.text = toDO.text;
		this.notes = toDO.notes;
		this.isChecked = toDO.isChecked;
	};
	this.timeRemannig = function () {
		if (this.dueDate === 0) {
			return null;
		}
		var currentDate = new Date();
		var result = currentDate.getMilliseconds() - this.dueDate.getMilliseconds();
		//	setTimeout(this.eventDueDateOver.notify(), result);
		if (result <= 0) {
			console.log("todo timeout");
		} else {
			setTimeout(function () {
				console.log("todo timeout");
			}, result);
		}
		return result;
	};
});