<?php

require_once 'autoload.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Headers: X-Requested-With');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
//date_default_timezone_set('Africa/Cairo');

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
	exit();
}

$parameter = RouteController::getParameter();

$class = @strtolower($parameter[0]);
$action = @strtolower($parameter[1]);

switch ($class) {
	case 'todo':
		switch ($action) {
			case 'create':
				echo TodoController::create();
				break;
			case 'read':
				echo TodoController::read();
				break;
			case 'readall':
				echo TodoController::readAll();
				break;
			case 'update':
				echo TodoController::update();
				break;
			case 'delete':
				echo TodoController::delete();
				break;
			default:
				http_response_code(400);
				break;
		}
		break;
//==========================================================
	case 'user':
		switch ($action) {
			case 'create':
				echo UserController::create();
				break;
			case 'read':
				echo UserController::read();
				break;
			case 'update':
				echo UserController::update();
				break;
			case 'delete':
				echo UserController::delete();
				break;
			case 'login':
				echo UserController::login();
				break;
			case 'checkemail':
				echo UserController::checkEmail();
				break;
			default:
				http_response_code(400);
				break;
		}
		break;
//==========================================================
	default:
		http_response_code(400);
		break;
}















/*
switch ($class) {
	case 'todo':
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'POST':
				echo TodoController::create();
				break;
			case 'GET':
				echo TodoController::readAll(); //echo TodoController::read(); or 
				break;
			case 'PUT':
				echo TodoController::update();
				break;
			case 'DELETE':
				echo TodoController::delete();
				break;
			default:
				break;
		}
		break;
//==========================================================
	case 'user':
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'POST':
				switch ($action) {
					case 'create':
						echo UserController::create();
						break;
					case 'login':
						echo UserController::login();
						break;
					default:
						break;
				}
				break;
			case 'GET':
				echo UserController::read();
				break;
			case 'PUT':
				echo UserController::update();
				break;
			case 'DELETE':
				echo UserController::delete();
				break;
			default:
				break;
		}
		break;
//==========================================================
	default:
		echo "Error :class does not exists";
}
*/