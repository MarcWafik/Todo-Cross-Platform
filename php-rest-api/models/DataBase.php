<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DataBase
 *
 * @author marcw
 */
class DataBase {

	private static $servername = "localhost";
	private static $username = "root";
	private static $password = "";
	private static $dbname = "todo";
	private static $dbConnection = null;

	/**
	 * 
	 * @return PDO the connection of the database or null on failed to connect
	 */
	public static function getConnection() {
		if (static::$dbConnection === null) {
			try {
				static::$dbConnection = new PDO("mysql:host=" . static::$servername . ";dbname=" . static::$dbname, static::$username, static::$password);
				// set the PDO error mode to exception
				static::$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return static::$dbConnection;
			} catch (PDOException $e) {
				static::$dbConnection = null;
				echo "Connection failed: " . $e->getMessage();
			}
		}
		return static::$dbConnection;
	}

}
