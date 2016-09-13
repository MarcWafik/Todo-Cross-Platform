<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Entity
 *
 * @author marcw
 */
abstract class Entity {

	public $id;
	public $timeCreated;
	public $timeUpdated;

	public function __construct() {
		$this->id = 0;
		$this->timeCreated = new DateTime();
		$this->timeUpdated = new DateTime();
	}

	/**
	 * used to copy the data from a json object
	 * @param $obj the json object or an instance of that class  
	 */
	public function copy($obj) {
		$this->id = $obj->id;
		$this->timeCreated = new DateTime($obj->timeCreated);
		$this->timeUpdated = new DateTime($obj->timeUpdated);
	}

	/**
	 * used to bind the current object data to statment for query purposes
	 * @param database insert/update statment $stmt used to link the attributed of the current object
	 */
	protected function bindParamClass($stmt) {
		
	}

//=================================================Const===================================================
	const DB_TABLE_NAME = "";

//================================================CUID===================================================
	/**
	 * a generic function that excuted sql comand and bind parameter for updated or creat purposes
	 * overried the object id in case of new creating to the last inserted ID
	 * @param string $comand the My SQL comand to be excuted
	 * @param boolean $creat if FALSE the it ill update the entery 
	 * @return boolean true on succses false on failure
	 */
	protected function Do_comand_Update_Creat($comand, $creat = FALSE) {
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}
		try {
			$stmt = $conn->prepare($comand);
			$this->bindParamClass($stmt);

			if (!$creat) {
				$stmt->bindParam(':id', $this->id);
			}
			$ret = $stmt->execute();
			if ($creat && $ret) {
				$this->id = $conn->lastInsertId();
			}
			return $ret;
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
			return FALSE;
		}
	}

	/**
	 * premenantly delete user for database
	 * @return boolean true for succses
	 */
	public function delete() {
		return static::delete_Static($this->id);
	}

	/**
	 * premenantly delete user for database
	 * @param int $id if of the object to be deleted
	 * @return boolean true for succses
	 */
	public static function delete_Static($id) {
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}
		try {
			$stmt = $conn->prepare("DELETE FROM " . static::DB_TABLE_NAME . " WHERE ID=:imputID");
			$stmt->bindParam(':imputID', $id);
			$stmt->execute();
			return TRUE;
		} catch (PDOException $e) {
			echo $e->getMessage();
			return FALSE;
		}
	}

	/**
	 * fetch the data from the database
	 * overieds this objects data with the fetched data
	 * @param int $id if of the object to be read
	 * @return mixed false for failure or object with matching id
	 */
	public function read($id) {
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}

		try {
			$stmt = $conn->prepare("SELECT * FROM " . static::DB_TABLE_NAME . " WHERE ID=:imputID");
			$stmt->bindParam(':imputID', $id);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_INTO, $this);

			return $stmt->fetch() != false; // return true for succses false for empty
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
			return FALSE;
		}
	}

	/**
	 * return all the data in the table
	 * @param int $offset used for pagination
	 * @param int $size the max amount of elements
	 * @return assosiative arrray of the data ( can be used to send a json object )
	 */
	public static function readAll($offset = 0, $size = 0) {
		$comand = "SELECT * FROM " . static::DB_TABLE_NAME;
		return static::Do_comand_readAll($comand, $offset, $size);
	}

	/**
	 * a generic function that excuted sql comand for read multipe rows
	 * @param string $comand the My SQL comand to be excuted
	 * @param boolean $creat if FALSE the it ill update the entery 
	 * @return mixed array of objects fetched from database or false on failure
	 */
	protected static function Do_comand_readAll($comand, $offset = 0, $size = 0) {
		if (isset($size) && isset($offset) && 0 < $size) {
			$comand .= " LIMIT $size OFFSET $offset";
		}
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}

		try {
			$stmt = $conn->prepare($comand);
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_CLASS, get_class(new static));
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}
	}

	/**
	 * a generic function that excuted sql comand for search
	 * @param string $comand the My SQL comand to be excuted
	 * @param boolean $creat if FALSE the it ill update the entery 
	 * @return mixed array of objects fetched from database or false on failure
	 */
	public static function Do_comand_Search($comand, $find, $offset = 0, $size = 0) {
		if (isset($size) && isset($offset) && 0 < $size) {
			$comand .= " LIMIT $size OFFSET $offset";
		}
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}
		$find = '%' . $find . '%';
		try {
			$stmt = $conn->prepare($comand);
			$stmt->bindParam(':find', $find);
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_CLASS, get_class(new static));
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}
	}

//===================================================SET===================================================
	function setTimeCreated() {
		$this->timeCreated = new DateTime();
	}

	function setTimeUpdated() {
		$this->timeUpdated = new DateTime();
	}

}
