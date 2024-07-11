<?php

// log out users

// remove cookies by setting expiration in th past
$expiration = time() - 1;
setcookie("resumeIsAuth", "", $expiration);
setcookie("resumeName", "", $expiration);

// redirect to home page
header("Location: index.php");
die();

