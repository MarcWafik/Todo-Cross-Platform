/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var ToDoView = {
	Add: function (text, date) {
		ToDoController.Add(text.value, "notes", new Date(date.value));
		text.value = "";
		date.value = "";
		this.List();
	},
	Delete: function (button) {
		ToDoController.Delete(button.parentNode.value);
		this.List();
	},
	Check: function (checkbox) {
		ToDoController.Check(checkbox.parentNode.value, Boolean(checkbox.checked));
	//	checkbox.parentNode.style.cssText+=";text-decoration: line-through;";
		//checkbox.style.
	},
	List: function () {
		var mylist = document.getElementById("todoarea");
		mylist.innerHTML = "";
		var todos = ToDoController.List();
		for (var i = 0; i < todos.length; i++) {
			mylist.innerHTML += this.PrintTodo(todos[i], i);
		}
	},
	PrintTodo: function (ToDo, i) {
		return 	'<li value="' + i + '"> <input type="checkbox" onChange="ToDoView.Check(this)" '
				+ this.PrintChecked(ToDo.isChecked) + '>' + ToDo.text +
				'<input type="button" value="x" class="btn-circular" onClick="ToDoView.Delete(this)"></li>';
	},
	PrintChecked: function (ismarked) {
		if (ismarked)
			return "checked";
		return "";
	}
};