<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of todoControler
 *
 * @author marcw
 */
class TodoController {

	/**
	 * creat a new todo
	 * uses post to get the object
	 * @return mixed json object or 0 on failure
	 */
	static function create() {
		$todo = new Todo();
		$todo->copy(json_decode(file_get_contents('php://input')));
		return RouteController::responce($todo->create(), $todo);
	}

	/**
	 * read the todo from the url get
	 * echo the newly added json object or 0 on failure
	 * $_REQUEST["id"]
	 * @return mixed json object or 0 on failure
	 */
	static function read() {
		if (isset($GLOBALS["parameter"][2])) {
			$todo = new Todo();
			return RouteController::responce($todo->read($GLOBALS["parameter"][2]), $todo);
		}
		http_response_code(400);
	}

	/**
	 * reads all the todos related to that user id
	 * $_REQUEST["userID"]
	 * @return mixed json object or 0 on failure
	 */
	static function readAll() {
		if (isset($GLOBALS["parameter"][2])) {
			return RouteController::responce(TRUE, Todo::readAllbyUser($GLOBALS["parameter"][2]));
		}
		http_response_code(400);
	}

	/**
	 * modify a already existing todo
	 * uses post to get the object
	 * @return int 1 on succses or 0 on failure
	 */
	static function update() {
		$myTodo = new Todo();
		$myTodo->copy(json_decode(file_get_contents('php://input')));
		return RouteController::responce($myTodo->update(), $myTodo);
	}

	/**
	 * delete the todo by id
	 * $_REQUEST["id"]
	 */
	static function delete() {
		if (isset($GLOBALS["parameter"][2])) {
			return RouteController::responce(Todo::delete_Static($GLOBALS["parameter"][2]));
		}
		http_response_code(400);
	}

}
