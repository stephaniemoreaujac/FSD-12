<?php

// log out users

// remove cookies by setting expiration in th past
$expiration = time() - 1;
setcookie("resumeIsAuth", "", $expiration);
setcookie("resumeName", "", $expiration);

// session logout
session_start(); // to access our $_SESSION

$_SESSION = []; // empty the session file
session_destroy(); // delete the session file
session_reset(); // reset the session


// redirect to home page
header("Location: index.php");
die();

