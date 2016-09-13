<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Todo
 *
 * @author marcw
 */
class Todo extends Entity implements iCRUD {

	public $text;
	public $description;
	public $dueDate;
	public $isChecked;
	public $userID;

	const DB_TABLE_NAME = "todos";

	/**
	 * only used to set default values
	 */
	function __construct() {
		parent::__construct();
		$this->text = "";
		$this->description = "";
		$this->dueDate = new DateTime();
		$this->isChecked = FALSE;
		$this->userID = 0;
	}

	/**
	 * used to copy the data from a json object
	 * @param $obj the json object or an instance of that class  
	 */
	public function copy($obj) {
		parent::copy($obj);
		$this->text = $obj->text;
		$this->description = $obj->description;
		$this->setDueDate($obj->dueDate);
		$this->isChecked = $obj->isChecked;
		$this->userID = $obj->userID;
	}

	/**
	 * used to bind the current object data to statment for query purposes
	 * @param $stmt database insert/update statment $stmt used to link the attributed of the current object
	 */
	protected function bindParamClass($stmt) {
		parent::bindParamClass($stmt);

		$stmt->bindParam('text', $this->text);
		$stmt->bindParam('description', $this->description);
		$stmt->bindParam('dueDate', $this->getDueDateforPDO());
		$stmt->bindParam('isChecked', $this->isChecked);
		$stmt->bindParam('userID', $this->userID);
	}

//==================================================CRUD===================================================
	/**
	 * insert this to do into the database
	 * overides the object id to the new id assigned by auto increments 
	 * @return boolean true for succses false for failure
	 */
	public function create() {
		return $this->Do_comand_Update_Creat("INSERT INTO " . static::DB_TABLE_NAME . "
				(	    text,
						description,
						dueDate,
						isChecked,
						userID
				) VALUES ( 
						:text,
						:description,
						:dueDate,
						:isChecked,
						:userID
				)", TRUE);
	}

	/**
	 * update this to do into the database
	 * must be an already exsiting todo with the same id
	 * @return boolean true for succses false for failure
	 */
	public function update() {
		return $this->Do_comand_Update_Creat("UPDATE " . static::DB_TABLE_NAME . " SET 
						text = :text,
						description = :description,
						dueDate = :dueDate,
						isChecked = :isChecked,
						userID = :userID
				WHERE id=:id", FALSE);
	}

	/**
	 * fetch all the todo that has a forigen key userid
	 * @param int $id the User ID
	 * @param int $offset used for pagination
	 * @param int $size the max amount of elements
	 * @return assosiative arrray of the data ( can be used to send a json object )
	 */
	public static function readAllbyUser($id, $offset = 0, $size = 0) {
		$comand = "SELECT * FROM " . static::DB_TABLE_NAME . " WHERE userID=:userID";
		if (isset($size) && isset($offset) && 0 < $size) {
			$comand .= " LIMIT $size OFFSET $offset";
		}
		$conn = DataBase::getConnection();
		if ($conn === null) {
			return FALSE;
		}
		try {
			$stmt = $conn->prepare($comand);
			$stmt->bindParam('userID', $id);
			$stmt->execute();
			return $stmt->fetchAll();
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}
		return static::Do_comand_readAll($comand, $offset, $size);
	}

//===================================================SET===================================================

	function setText($text) {
		if (isset($text)) {
			$this->text = $text;
			return TRUE;
		}
		return FALSE;
	}

	function setDescription($description) {
		if (isset($description)) {
			$this->description = $description;
			return TRUE;
		}
		return FALSE;
	}

	function setDueDate($dueDate) {
		if (isset($dueDate) && is_string($dueDate) && date_parse($dueDate)) {
			$this->dueDate = new DateTime($dueDate);
		} else if (isset($dueDate) && get_class($dueDate) == "DateTime") {
			$this->dueDate = $dueDate;
		} else {
			$this->dueDate = NULL;
		}
		return TRUE;
	}

	function setIsChecked($isChecked) {
		if (isset($isChecked)) {
			$this->isChecked = $isChecked;
			return TRUE;
		}
		return FALSE;
	}

	function setUserID($userID) {
		if (isset($userID)) {
			$this->userID = $userID;
			return TRUE;
		}
		return FALSE;
	}

//===================================================GET===================================================
	function getText() {
		return $this->text;
	}

	function getDescription() {
		return $this->description;
	}

	function getDueDate() {
		return $this->dueDate;
	}

	function getDueDateforPDO() {
		if (isset($this->dueDate)) {
			return $this->dueDate->format("Y-m-d H:i:s");
		}
		return null;
	}

	function getIsChecked() {
		return $this->isChecked;
	}

	function getUserID() {
		return $this->userID;
	}

}
