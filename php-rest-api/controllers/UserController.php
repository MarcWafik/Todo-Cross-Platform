<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of userController
 *
 * @author marcw
 */
class UserController {

	/**
	 * creat a new user
	 * uses post to get the object
	 * @return mixed json object or 0 on failure
	 */
	static function create() {
		$myUser = new User();
		$myUser->copy(json_decode(file_get_contents('php://input')));
		$myUser->hashPassword();
		return RouteController::responce(User::isEmailAvailable($myUser->email) && $myUser->create(), $myUser);
	}

	/**
	 * read the user from the url get
	 * echo the newly added json object or 0 on failure
	 * $_REQUEST["id"]
	 * @return mixed json object or 0 on failure
	 */
	static function read() {
		if (isset($GLOBALS["parameter"][2])) {
			$user = new User();
			return RouteController::responce($user->read($GLOBALS["parameter"][2]), $user);
		}
		http_response_code(400);
	}

	/**
	 * modify a already existing user
	 * uses post to get the object
	 * @return int 1 on succses or 0 on failure
	 */
	static function update() {
		$myUser = new User();
		$myUser->copy(json_decode(file_get_contents('php://input')));
		return RouteController::responce($myUser->update());
	}

	/**
	 * delete the user by id
	 * $_REQUEST["id"]
	 */
	static function delete() {
		if (isset($GLOBALS["parameter"][2])) {
			return RouteController::responce(User::delete($GLOBALS["parameter"][2]));
		}
		http_response_code(400);
	}

	static function login() {
		$myUser = new User();
		$myUser->copy(json_decode(file_get_contents('php://input')));
		return RouteController::responce($myUser->Login(), $myUser);
	}

	static function checkEmail() {
		if (isset($_REQUEST["email"])) {
			return RouteController::responce(TRUE, User::isEmailAvailable($_REQUEST["email"]));
		} else if (isset($GLOBALS["parameter"][2])) {
			return RouteController::responce(TRUE, User::isEmailAvailable($GLOBALS["parameter"][2]));
		}
		http_response_code(400);
	}

}
