<?php

function __autoload($className) {
	if (is_readable("models/$className.php")) {
		require_once( "models/$className.php");
	} else if (is_readable("controllers/$className.php")) {
		require_once( "controllers/$className.php" );
	}
}
