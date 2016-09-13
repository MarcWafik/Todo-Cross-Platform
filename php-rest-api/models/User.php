<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author marcw
 */
class User extends Entity implements iCRUD {

	public $name;
	public $password;
	public $email;

	const DB_TABLE_NAME = "users";

	/**
	 * only used to set default values
	 */
	function __construct() {
		parent::__construct();
		$this->name = "";
		$this->password = "";
		$this->email = "";
	}

	/**
	 * used to copy the data from a json object
	 * @param $obj the json object or an instance of that class  
	 */
	public function copy($obj) {
		parent::copy($obj);
		$this->name = $obj->name;
		$this->password = $obj->password;
		$this->email = $obj->email;
	}

	/**
	 * used to bind the current object data to statment for query purposes
	 * @param database insert/update statment $stmt used to link the attributed of the current object
	 */
	protected function bindParamClass($stmt) {
		parent::bindParamClass($stmt);

		$stmt->bindParam('name', $this->name);
		$stmt->bindParam('password', $this->password);
		$stmt->bindParam('email', $this->email);
	}

//==================================================CRUD===================================================
	/**
	 * insert this to do into the database
	 * overides the object id to the new id assigned by auto increments 
	 * @return boolean true for succses false for failure
	 */
	public function create() {
		return $this->Do_comand_Update_Creat("INSERT INTO " . static::DB_TABLE_NAME . " 
				(
					email,
					password,
					name
				) VALUES (
					:email,
					:password,
					:name
				)", TRUE);
	}

	/**
	 * update this to do into the database
	 * must be an already exsiting todo with the same id
	 * @return boolean true for succses false for failure
	 */
	public function update() {
		return $this->Do_comand_Update_Creat("UPDATE " . static::DB_TABLE_NAME . " SET 
					email = :email,
					password = :password,
					name = :name
				WHERE id=:id", FALSE);
	}

	/**
	 * search in the data base for a user with email or name similar to $find
	 * @param string $find
	 * @param int $offset used for pagination
	 * @param int $size the max amount of elements
	 * @return assosiative arrray of the data ( can be used to send a json object )
	 */
	public static function Search($find, $offset = 0, $size = 0) {
		return static::Do_comand_Search("SELECT * FROM " . static::DB_TABLE_NAME . " WHERE 
					email LIKE :find OR 
					name LIKE :find"
						, $find, $offset, $size);
	}

	/**
	 * uses the user password and email to login
	 * have to be set in the object befor calling this function
	 * @return mixed False on failure or and object on succses
	 */
	function Login() {
		$oldPassword = $this->password;
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}

		try {
			$stmt = $conn->prepare("SELECT * FROM " . static::DB_TABLE_NAME . " WHERE email=:email");
			$stmt->bindParam(':email', $this->email);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_INTO, $this);

			return ($stmt->fetch() != FALSE) && ($this->isCorrectPassword($oldPassword));
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
			return FALSE;
		}
	}

//===================================================is===================================================
	/**
	 * checks in the data base if email already exists
	 * @param string $email the email to be checked
	 * @return boolean False if email is taken 
	 */
	public static function isEmailAvailable($email) {
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}

		try {
			$stmt = $conn->prepare("SELECT * FROM " . static::DB_TABLE_NAME . " WHERE email=:email");
			$stmt->bindParam(':email', $email);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_ASSOC);

			$temp = $stmt->fetch();
			if (!$temp) {
				return TRUE;
			}
			return FALSE;
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
			return FALSE;
		}
	}

	/**
	 * checks if the password passed as a parameter matched the user password
	 * @param string $password the password will be hashed and checked
	 * @return boolean False if email is taken 
	 */
	public function isCorrectPassword($password) {
		return ((isset($password)) && ( hash("sha256", $password) == $this->password));
	}

//===================================================SET===================================================

	public function setPassword($password) {
		if (isset($password)) {
			$this->password = hash("sha256", $password);
			return TRUE;
		}
		return FALSE;
	}

	public function hashPassword() {
		if (strlen($this->password) != 64) {
			$this->password = hash("sha256", $this->password);
		}
	}

	public function setPasswordRandom() {
		$result = substr(md5(uniqid(rand(), true)), 0, 8);
		$this->password = hash("sha256", $result);
		return $result;
	}

	function setName($name) {
		if (isset($name)) {
			$this->name = $name;
			return TRUE;
		}
		return FALSE;
	}

	function setEmail($email) {
		if (isset($email)) {
			$this->email = $email;
			return TRUE;
		}
		return FALSE;
	}

}
