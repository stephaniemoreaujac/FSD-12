<?php

// SESSION VARIABLES

// to use sessions we must start a sessions
session_start();

// list all available session variables
echo "<pre>"; 
print_r($_SESSION);

$_SESSION['month'] = "July";
$_SESSION['moth'] = "Juby";

//remove a single variable
// unset($_SESSION['moth']);

//removes ALL variables
session_unset();

// remove session file from the server
session_destroy();


print_r($_SESSION);
