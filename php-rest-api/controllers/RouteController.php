<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RouteController
 *
 * @author marcw
 */
class RouteController {

	private static $URL;
	private static $parameter;

	/**
	 * get the parameters from the url
	 * @return array
	 */
	public static function getParameter() {

		if (!isset(static::$parameter)) {
			static::$URL = $_SERVER['REQUEST_URI'];

			static::$parameter = split("\\\\", getcwd());
			foreach (static::$parameter as $value) {
				static::$URL = str_replace($value, "", static::$URL);
			}
			static::$URL = str_replace("//", "", static::$URL);
			static::$parameter = split("/", static::$URL);


			if (static::$parameter[0] == "") {
				array_splice(static::$parameter, 0, 1);
			}

			return static::$parameter;
		}
	}

	/**
	 * @param boolean $status failed or succses
	 * @param mixed $data the data to be send as a jason
	 * @return json String with asoc status & data
	 */
	public static function responce($status, $data = "") {
		if ($status) {
			return json_encode(array('status' => $status, 'data' => $data));
		} else {
			return json_encode(array('status' => $status));
		}
	}

}
